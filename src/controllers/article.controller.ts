import { Request, Response } from "express";

export const submitArticles = (req: Request, res: Response) => {
  res.status(200).json({ data: "All Articles" });
};

export const getArticlesByJobId = (req: Request, res: Response) => {
  const { jobId } = req.params;

  res.status(200).json({ data: "Articles By job id", jobId });
}