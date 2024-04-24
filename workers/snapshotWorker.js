const { spawn } = require('child_process');
const throng = require('throng');
const IORedis = require('ioredis');
const { Worker } = require('bullmq');
require('dotenv').config()

const MAX_HISTORY_LENGTH = 10;
const HASH_KEY = 'percy:snapshots';

// Redis Configuration
let redisOptions = {
  port: parseInt(process.env.REDIS_PORT || '6379'),
  host: process.env.REDIS_HOST || '',
  password: process.env.REDIS_PASSWORD || '',
  db: parseInt(process.env.REDIS_DB || '0'),
};

if (process.env.REDIS_TLS) {
  redisOptions.tls = { rejectUnauthorized: false };
}

const redisConnection = new IORedis(redisOptions);

// Acquire and release lock
const acquireLock = async (lockKey, ttl) => {
  const result = await redisConnection.set(lockKey, 'locked', 'EX', ttl, 'NX');
  return result === 'OK';
};

const releaseLock = async (lockKey) => {
  await redisConnection.del(lockKey);
};


// Process snapshot job
const processSnapshotJob = async (job) => {
  const { fileName } = job.data;
  const percyToken = fileName.toUpperCase().replace(/-/g, '_');

  if (process.env[percyToken]) {
    process.env.PERCY_TOKEN = process.env[percyToken];
    console.log(process.env.PERCY_TOKEN);
  } else {
    console.error(`Environment variable ${percyToken} is not defined.`);
  }

  // Retrieve fileName from job data
  const now = new Date().toISOString();
  const lockKey = `lock:${HASH_KEY}:${fileName}`;
  const lockTTL = 30;

  try {
    const acquired = await acquireLock(lockKey, lockTTL);

    if (!acquired) {
      console.log('Another worker is already processing the job. Skipping...');
      return;
    }

    const existingRecord = await redisConnection.hget(HASH_KEY, fileName);
    const parsedRecord = existingRecord ? JSON.parse(existingRecord) : { history: [] };

    const percyProcessPromise = new Promise((resolve) => {
      const percyProcess = spawn('npx', ['percy', 'snapshot', `percyList/snapshots/${fileName}.js`]);
      let stderrData = '';
    
      percyProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
        console.error(`stderr: ${data}`);
      });
    
      percyProcess.on('close', async (code) => {
        console.log(`Percy process exited with code ${code}`);
        const errorMessages = stderrData
          .split('\n')
          .filter((line) => line.includes('[percy] Encountered an error'))
          .map((line) => line.replace('[percy] Encountered an error', '').trim());
    
        const jobInfo = {
          id: job.id,
          status: code === 0 && errorMessages.length === 0 ? 'done' : 'error',
          run_at: now,
          errors: errorMessages.length === 0 ? null : errorMessages,
        };
    
        const history = [jobInfo, ...parsedRecord.history.slice(0, MAX_HISTORY_LENGTH - 1)];
    
        const updatedRecord = {
          ...parsedRecord,
          history,
          last_run: now,
          last_job_status: jobInfo.status,
          status: 'not running',
        };
    
        console.log('Updated Record:', updatedRecord);
    
        await redisConnection.hset(HASH_KEY, fileName, JSON.stringify(updatedRecord));
    
        if (errorMessages.length === 0) {
          console.log('No errors detected.');
        } else {
          console.error('Errors detected:', errorMessages);
        }
    
        resolve();
      });
    });
    await percyProcessPromise;
    console.error('Closed connection');
  } finally {
    await releaseLock(lockKey);
    console.log('Released lock:', lockKey);
  }
};

// Start worker
const start = () => {
  new Worker(
    'snapshots-job',
    async job => {
      await processSnapshotJob(job);
    },
    { redisConnection }
  );
};

// Throng configuration
const workers = process.env.WEB_CONCURRENCY || 2;
throng({ workers, start });
