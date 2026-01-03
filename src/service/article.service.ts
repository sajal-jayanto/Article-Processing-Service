import { Article } from "../@types/article"

export class ArticleService {

  static processArticles = (articles: Article[]) => {
    return "123456789"
  }

  static findArticles = (jobId: string) => {
    return { status: "processing" }
  }
}