import { createClient } from 'redis';
import { Config } from '../../config';

class RedisService {
  private redisClient;

  constructor() {
    const config = new Config()
    this.redisClient = createClient({
      url: `redis://default:${config.redisPassword}@${config.redisHost}:${config.redisPort}`
    });

    this.redisClient.on('error', (error) => {
      console.error(error);
    });
  }

  public async setJson(key: string, value: any, ttl?: number): Promise<any> {
    const jsonValue = JSON.stringify(value)
    return await this.set(key, jsonValue, ttl)
  }

  public async getJson<T>(key: string): Promise<T> {
    const value = await this.get(key)
    if(!value) {
      return null
    }

    return JSON.parse(value) as T
  }

  public async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        if (ttl) {
          this.redisClient.set(key, value, 'EX', ttl, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          this.redisClient.set(key, value, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        }
      });
    } finally {
      this.quit();
    }
  }  

  public async get(key: string): Promise<string> {
    try {
      return await new Promise<string>((resolve, reject) => {
        this.redisClient.get(key, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    } finally {
      this.quit();
    }
  }

  public async del(key: string): Promise<number> {
    try {
      return await new Promise<number>((resolve, reject) => {
        this.redisClient.del(key, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    } finally {
      this.quit();
    }
  }

  private quit(): void {
    this.redisClient.quit();
  }
}

export default RedisService;
