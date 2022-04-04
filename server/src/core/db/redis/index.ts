import { createClient } from 'redis';

export class RedisClient {
  private redisClient: any;

  constructor() {}

  private async connectToRedis() {
    try {
      this.redisClient = createClient({
        url: process.env.REDIS_URL,
      });
      await this.redisClient.connect();
    } catch (err) {
      console.log('SOCCKET ERROR CONNECTION---------');
      throw err;
    }
  }

  async getData(key: string) {
    try {
      await this.connectToRedis();
      return this.redisClient.get(key);
    } catch (err) {
      console.log('REDIS GET DATA ERROR--------');
    }
  }

  async setData(key: string, value: string, expireTime?: number) {
    try {
      await this.connectToRedis();
      return this.redisClient.set(key, value, {
        EX: expireTime || 12 * 60 * 60,
      });
    } catch (err) {
      console.log('REDIS SET DATA ERROR--------');
    }
  }
}
