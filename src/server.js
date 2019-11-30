import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import requireDir from "require-dir";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

requireDir("./models");
app.use("/", routes);

app.listen(3333, () => {
  console.log("[api] - Api listening");
});
