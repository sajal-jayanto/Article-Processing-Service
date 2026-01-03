import { Article, JobAnalysis, JobStatus } from "../@types/article"
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from "../redis/redis.service";

export class ArticleService {

  static processArticles = async (articles: Article[]) => {
    const jobId = uuidv4();
    const currentCacheType = await RedisService.get('cacheType');
    RedisService.set(jobId, { jobId, status: JobStatus.Processing, cacheType: currentCacheType });

    return jobId
  }

  static findArticles = async (jobId: string) => {
    const rawValue = await RedisService.get(jobId);
    if (!rawValue) {
      return { status: "not_found" };
    }

    const jobAnalysis = rawValue as JobAnalysis;
    const { status, cacheType } = jobAnalysis;

    if (status === JobStatus.Completed) {
      return {

      }
    }

    return status
  }
}