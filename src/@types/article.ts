export interface Article {
  id: string;
  title: string;
  content: string;
}

export interface AnalysisState {
  status: string;
  storeType: string;
  data?: any;
}

export interface JobAnalysis {
  jobId: string,
  status: string,
  analysis: {
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

export interface TextAnalysis {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  longestWord: string;
  uniqueWords: string[];
}