export interface Article {
  id: string;
  title: string;
  content: string;
}


export interface JobAnalysis {
  jobId: string,
  status: string,
  cacheType: string,
  analysis?: {
    wordCount: number,
    sentenceCount: number,
    paragraphCount: number,
    longestWord: string,
    uniqueWords: string[]
  }
}

export enum JobStatus {
  Processing = "processing",
  Completed = "completed",
  Failed = "failed",
}