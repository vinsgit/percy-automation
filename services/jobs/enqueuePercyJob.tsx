import RedisService from '../redisService';

export async function enqueuePercyJob(fileName: string) {
  const redisService = new RedisService('snapshots-job');
  try {
    if (redisService.queue) {
      await redisService.queue.add('snapshots-job', { fileName });
      console.log(`Enqueued Percy job for ${fileName}`);
    } else {
      console.error('Queue is undefined in RedisService');
    }
  } catch (error) {
    console.error('Error enqueuing Percy job', error);
  }
}
