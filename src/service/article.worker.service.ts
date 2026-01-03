import { Worker, Job } from 'bullmq';
import { QueueList } from '../@types/queue';
import { bullMqRedisConnection } from '../lib/queue';
import { ArticleService } from './article.service';
import { Article, JobAnalysis, JobStatus } from '../@types/article';
import { RedisService } from '../redis/redis.service';

const bullMqConfig = {
  connection: bullMqRedisConnection,
  limiter: {
    max: 1,
    duration: 1000
  },
  concurrency: Number(process.env.CONCURRENCY_WORKER_COUNT) || 2,
}

export const startArticleTaskWorker = () => {
  const worker = new Worker(QueueList.ARTICLE_TASK_QUEUE, async (job: Job) => {
    const result: JobAnalysis[] = []
    const articles = job.data as Article[];
    articles.forEach(article => {
      const analyze = ArticleService.analyzeArticles(article.content);
      result.push({ jobId: job.name, status: JobStatus.Completed, analysis: analyze })
    });
    await ArticleService.storeArticles(job.name, result);
  }, bullMqConfig);

  worker.on('completed', async (job) => {
    await RedisService.incr("job:completed", 1, 0);
    console.log(`Job ${job.name} is completed.`);
  });

  worker.on('failed', async (job, err) => {
    await RedisService.incr("job:failed", 1, 0);
    console.error(`Job ${job?.name} failed: ${err.message}`)
  });

  console.log('Article task worker is listening for tasks...');
};