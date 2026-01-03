import { Request, Response } from "express";
import { ArticleService } from "../service/article.service";
import { Article } from "../@types/article";

export const postArticles = async (req: Request, res: Response) => {
  try {
    const articles: Article[] = req.body;
    const jobId = await ArticleService.processArticles(articles);
    res.status(200).json({ jobId: jobId });
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

export const getArticlesByJobId = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const articles = await ArticleService.findArticles(jobId);
    res.status(200).json(articles);
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
}