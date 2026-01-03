import express from "express";
import routes from "./routes";
import { httpLogger } from "./middlewares/httpLogger";
import { invalidJsonFormat } from "./middlewares/validate";

const app = express();

app.use(express.json());
app.use(invalidJsonFormat)
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger)

app.use("/api", routes);

export default app;
