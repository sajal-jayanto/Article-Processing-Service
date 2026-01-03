import express from "express";
import routes from "./routes";
import { httpLogger } from "./middlewares/httpLogger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(httpLogger)

app.use("/api", routes);

export default app;
