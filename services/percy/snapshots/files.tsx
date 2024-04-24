import fs from 'fs';
import path from 'path';
import RedisService from '../../redisService';

const redisService = new RedisService();
const redisConnection = redisService.getRedisConnection();

const fetchFiles = async (params: any) => {
  const percyListDirectory = path.join(process.cwd(), params.directory);
  const files = fs.readdirSync(percyListDirectory);
  const hashKey = 'percy:snapshots';

  try {
    if (params.fileName) {
      const existingRecord = await redisConnection.hget(hashKey, params.fileName);
      if (existingRecord) {
        const parsedRecord = JSON.parse(existingRecord);
        console.log()
        return parsedRecord;
      } else {
        return null;
      }
    } else {
      const data = await Promise.all(files.map(async (file, index) => {
        const file_name = file.replace('.js', '');
        const existingRecord = await redisConnection.hget(hashKey, file_name);

        if (!existingRecord) {
          const newRecord = {
            id: index.toString(),
            file_name,
            last_job_status: '',
            last_run: '',
            status: 'not running',
            history: []
          };
          await redisConnection.hset('percy:snapshots', file_name, JSON.stringify(newRecord));
          return newRecord;
        }

        const parsedRecord = JSON.parse(existingRecord);
        return {
          id: parsedRecord.id || index.toString(),
          file_name,
          last_job_status: parsedRecord.last_job_status || '',
          last_run: parsedRecord.last_run || '',
          status: parsedRecord.status || '',
        };
      }));

      return data;
    }
  } catch (error) {
    console.error('Error reading percyList directory or fetching records', error);
    throw error;
  }
};

export default fetchFiles;
