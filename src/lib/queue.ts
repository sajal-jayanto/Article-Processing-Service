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
    attempts: Number(process.env.ARTICLE_TASK_RETRIES) || 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: true,
  },
});

// export const addTask = async (name: string, data: any) => {
//   return await ArticleTaskQueue.add(name, data);
// };


// import { Worker, Job } from 'bullmq';
// import { redisConnection } from '../lib/Queue';

// export const startWorker = () => {
//   const worker = new Worker(
//     'MAIN_TASK_QUEUE', 
//     async (job: Job) => {
//       // Logic for different job types
//       switch (job.name) {
//         case 'sendEmail':
//           console.log(`Sending email to: ${job.data.email}`);
//           // await emailService.send(...)
//           break;

//         case 'processVideo':
//           console.log(`Processing video ID: ${job.data.id}`);
//           break;

//         default:
//           console.warn(`No processor for job: ${job.name}`);
//       }
//     }, 
//     { connection: redisConnection }
//   );

//   worker.on('completed', (job) => console.log(`✅ Job ${job.id} finished`));
//   worker.on('failed', (job, err) => console.error(`❌ Job ${job?.id} failed: ${err.message}`));

//   console.log('🚀 Worker is listening for tasks...');
// };