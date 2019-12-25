import express from "express";
import axios from "axios";

const routes = express.Router();

const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");

routes.get("/", (req, res) => {
  res.send(`Master Vidros Api`);
});
//User
routes.get("/user", UserController.index);
routes.get("/user/:id", UserController.show);
routes.post("/user", UserController.store);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.destroy);
//Order
routes.get("/order", OrderController.index);
routes.post("/order", OrderController.store);

module.exports = routes;
