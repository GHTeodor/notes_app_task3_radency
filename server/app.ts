import express from "express";
import cors from "cors";

import {configs} from "./configs";
import {apiRouter} from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors(), apiRouter);

const {PORT} = configs;
app.listen(PORT, "localhost", () =>
    console.log(`Server has been started on PORT: http://localhost:${PORT}/notes/stats 🚀🚀🚀`));