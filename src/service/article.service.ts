import { Article, JobAnalysis, JobStatus, AnalysisState } from "../@types/article"
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from "../redis/redis.service";
import { articleTaskQueue } from "../lib/queue";
import { saveJSONToFile } from "../utils/logger";
import path from "path";
import fs from "fs/promises";

export class ArticleService {

  static processArticles = async (articles: Article[]) => {
    const jobId = uuidv4();
    const currentStoreType = await RedisService.get('storeType');
    RedisService.set(jobId, { status: JobStatus.Processing, storeType: currentStoreType });
    await articleTaskQueue.add(jobId, articles);
    return jobId
  }

  static findArticles = async (jobId: string) => {
    const rawValue = await RedisService.get(jobId);
    if (!rawValue) {
      return { status: "not_found" };
    }

    const { status, storeType, data: jobAnalysis } = rawValue as AnalysisState;
    if (status === JobStatus.Processing) {
      return { status: "processing" }
    }

    if (storeType === "inMemoryCache" && jobAnalysis) {
      return jobAnalysis;
    } else if (storeType === "fileBasedCache") {
      try {
        const fileName = jobId.concat(".json");
        const filePath = path.join(process.cwd(), "data", fileName);
        const fileData = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileData);
        return jsonData;
      } catch (err) {
        return { status: "not_found" };
      }
    }
    return { status: "not_found" };
  }

  static analyzeArticles = (text: string) => {
    if (!text || text.trim() === "") {
      return {
        wordCount: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        longestWord: "",
        uniqueWords: [],
      };
    }
    const sentenceEndRegex = /[.!?]+/;
    const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0);
    const sentences = text.split(sentenceEndRegex).map(s => s.trim()).filter(s => s.length > 0);
    const words = text.split(/\s+/).map(w => w.replace(/[^\w-]/g, "")).filter(w => w.length > 0);
    let longestWord = "";
    for (const w of words) {
      if (w.length > longestWord.length) longestWord = w;
    }
    const uniqueWords = Array.from(new Set(words));
    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      longestWord,
      uniqueWords,
    };
  }

  static storeArticles = async (jobId: string, data: JobAnalysis[]) => {
    const rawValue = await RedisService.get(jobId);
    if (!rawValue) {
      throw new Error("JobId not found.");
    }
    const { storeType } = rawValue as AnalysisState;
    if (storeType === "inMemoryCache") {
      RedisService.set(jobId, { status: JobStatus.Completed, data, storeType }, 300);
    } else if (storeType === "fileBasedCache") {
      try {
        const projectRoot = process.cwd();
        const folderPath = path.join(projectRoot, "data");
        const fileName = jobId.concat(".json");
        await saveJSONToFile(data, folderPath, fileName);
        RedisService.set(jobId, { status: JobStatus.Completed, storeType });
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
  }
}

