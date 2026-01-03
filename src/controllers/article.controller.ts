import { Request, Response } from "express";

export const submitArticles = (req: Request, res: Response) => {
  const articles = req.body;
  res.status(200).json({ articles });
};

export const getArticlesByJobId = (req: Request, res: Response) => {
  const { jobId } = req.params;
  res.status(200).json({ jobId });
}