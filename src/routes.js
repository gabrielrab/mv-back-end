import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send(`Master Vidros Api`);
});

module.exports = routes;
