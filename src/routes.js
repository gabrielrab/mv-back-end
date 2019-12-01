import express from "express";

const routes = express.Router();

const UserController = require("./controllers/UserController");

routes.get("/", (req, res) => {
  res.send(`Master Vidros Api`);
});
//User
routes.get("/user", UserController.index);
//routes.get("/user/:id", UserController.show);
//routes.post("/user", UserController.stores);
//routes.put("/user/:id", UserController.update);
//routes.delete("/user/:id", UserController.destroy);

module.exports = routes;
