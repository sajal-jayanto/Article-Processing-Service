import { Router } from "express";
import { getArticlesByJobId, postArticles } from "../controllers/article.controller";
import { validate } from "../middlewares/validate";
import { articleArraySchema, jobParamsSchema } from "../validators/article.validator";

const articleRouters = Router();

articleRouters.post("/", validate({ body: articleArraySchema }), postArticles);
articleRouters.get("/:jobId", validate({ params: jobParamsSchema }), getArticlesByJobId);

export default articleRouters;