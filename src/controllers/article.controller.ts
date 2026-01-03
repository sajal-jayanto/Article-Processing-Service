import { Request, Response } from "express";
import { ArticleService } from "../service/article.service";
import { Article } from "../@types/article";

export const postArticles = (req: Request, res: Response) => {
  try {
    const articles: Article[] = req.body;
    const jobId = ArticleService.processArticles(articles);
    res.status(200).json({ jobId: jobId });
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

export const getArticlesByJobId = (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const articles = ArticleService.findArticles(jobId);
    res.status(200).json(articles);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
}