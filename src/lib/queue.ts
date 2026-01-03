import { Queue, ConnectionOptions, Job } from 'bullmq';
import { QueueList } from '../@types/queue';

export const bullMqRedisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
};

export const articleTaskQueue = new Queue(QueueList.ARTICLE_TASK_QUEUE, {
  connection: bullMqRedisConnection,
  defaultJobOptions: {
    attempts: Number(process.env.TASK_RETRIES) || 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: true,
  },
});