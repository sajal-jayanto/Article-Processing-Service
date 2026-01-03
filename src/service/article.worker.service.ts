import { Worker, Job } from 'bullmq';
import { QueueList } from '../@types/queue';
import { bullMqRedisConnection } from '../lib/queue';

const bullMqConfig = {
  connection: bullMqRedisConnection,
  limiter: {
    max: 1,
    duration: 1000
  },
}

export const startArticleTaskWorker = () => {
  const worker = new Worker(QueueList.ARTICLE_TASK_QUEUE, async (job: Job) => {

    console.log({ name: job.name });
    console.log({ data: job.data });

  }, bullMqConfig);

  worker.on('completed', (job) => console.log(`Job ${job.name} finished`));
  worker.on('failed', (job, err) => console.error(`Job ${job?.name} failed: ${err.message}`));

  console.log('Article task worker is listening for tasks...');
};