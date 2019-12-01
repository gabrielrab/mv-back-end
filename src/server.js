import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import requireDir from "require-dir";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

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
app.use("/", require("./routes"));

app.listen(3333, () => {
  console.log("[api] - Api listening");
});
