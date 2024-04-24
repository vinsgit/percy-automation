import { Queue } from 'bullmq';
import IORedis, { Redis } from 'ioredis';

class RedisService {
  private redisConnection: Redis;
  public queue?: Queue;

  constructor(queueName?: string | null) {
    let redisOptions:any = {
      port: parseInt(process.env.REDIS_PORT || '6379'),
      host: process.env.REDIS_HOST || '',
      password: process.env.REDIS_PASSWORD || '',
      db:  parseInt(process.env.REDIS_DB || '0'),
    };

    if (process.env.REDIS_TLS) {
      redisOptions.tls = { rejectUnauthorized: false };
    }

    this.redisConnection = new IORedis(redisOptions);

    if (queueName) {
      this.queue = new Queue(queueName, {
        connection: this.redisConnection,
      });
    }
  }

  getRedisConnection() {
    return this.redisConnection;
  }
}

export default RedisService;
