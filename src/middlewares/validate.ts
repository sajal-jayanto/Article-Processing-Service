import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

interface ValidationSchemas {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}

export const validate =
  (schemas: ValidationSchemas) =>
    (req: Request, res: Response, next: NextFunction) => {
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, {
          abortEarly: false,
          allowUnknown: false,
          stripUnknown: true,
        });

        if (error) {
          const messages = error.details.map(d => `${d.path.join('.')} - ${d.message}`);
          return res.status(400).json({
            status: "error",
            source: "body",
            message: "Invalid request body",
            errors: messages,
          });
        }
        req.body = value;
      }

      if (schemas.query && Object.keys(req.query).length > 0) {
        const { error, value } = schemas.query.validate(req.query, {
          abortEarly: false,
          allowUnknown: false,
          stripUnknown: true,
        });

        if (error) {
          const messages = error.details.map(d => `${d.path.join('.')} - ${d.message}`);
          return res.status(400).json({
            status: "error",
            source: "query",
            message: "Invalid query parameters",
            errors: messages,
          });
        }
        req.query = value;
      }

      if (schemas.params && Object.keys(req.params).length > 0) {
        const { error, value } = schemas.params.validate(req.params, {
          abortEarly: false,
          allowUnknown: false,
          stripUnknown: true,
        });

        if (error) {
          const messages = error.details.map(d => `${d.path.join('.')} - ${d.message}`);
          return res.status(400).json({
            status: "error",
            source: "params",
            message: "Invalid route parameters",
            errors: messages,
          });
        }
        req.params = value;
      }
      next();
    };


export const invalidJsonFormat = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      status: "error",
      source: "body",
      message: "Invalid JSON format",
      errors: [err.message],
    });
  }
  next(err);
}