import Joi from "joi";

export const articleSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
});

export const articleArraySchema = Joi.array()
  .items(articleSchema)
  .min(1)
  .required();

export const jobParamsSchema = Joi.object({
  jobId: Joi.string().required().messages({
    "string.empty": "Job ID is required",
    "any.required": "Job ID is required",
  }),
});