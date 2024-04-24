const throng = require('throng');
const Queue = require('bull');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

// Connect to a local redis instance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
const workers = process.env.WEB_CONCURRENCY || 2;

// The maximum number of jobs each worker should process at once.
const maxJobsPerWorker = 50;

function start() {
  // Connect to the named work queue
  const workQueue = new Queue('work', REDIS_URL);

  workQueue.process(maxJobsPerWorker, async (job) => {
    console.log('data:', job.data);

    const fileName = job.data?.fileName;
    if (!fileName) {
      console.log('No fileName found in payload');
      return;
    }

    const path = `./percyList/snapshots/${fileName}.js`;

    try {
      await fs.promises.access(path, fs.constants.F_OK);
    } catch (err) {
      console.log('Cannot find percy script for app:', fileName);
      return;
    }

    const out_puts = [];

    const percyProcess = exec(`npx percy snapshot ${path}`);
    percyProcess.on('error', (error) => {
      console.error(`error: ${error.message}`);
      out_puts.push(`error: ${error.message}`);
    });
    percyProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      out_puts.push(`stderr: ${data}`);
    });
    percyProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    await new Promise((resolve) => {
      percyProcess.on('close', (code) => {
        console.log(`Percy process exited with code ${code}`);
        if (code === 0) {
          console.log('No errors detected.');
        } else {
          console.error('Errors detected.');
        }
        resolve();
      });
    });

    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { out_puts };
  });
}

// Initialize the clustered worker process
throng({ workers, start });
