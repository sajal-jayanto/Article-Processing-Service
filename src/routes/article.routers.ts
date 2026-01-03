import { Router } from "express";
import { getArticlesByJobId, submitArticles } from "../controllers/article.controller";
import { validate } from "../middlewares/validate";
import { articleArraySchema, jobParamsSchema } from "../validators/article.validator";

const articleRouters = Router();

articleRouters.post("/", validate({ body: articleArraySchema }), submitArticles);
articleRouters.get("/:jobId", validate({ params: jobParamsSchema }), getArticlesByJobId);

export default articleRouters;