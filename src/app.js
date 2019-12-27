import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import requireDir from "require-dir";
import mongoose from "mongoose";
import BullBoard from "bull-board";
import Queue from "./lib/Queue";
import socket from "socket.io";
import http from "http";

require("dotenv").config();

const app = express();
const server = http.Server(app);
const io = socket.listen(server);

BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});

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
app.use("/admin/filas", BullBoard.UI);

module.exports = { app: app, server: server };
