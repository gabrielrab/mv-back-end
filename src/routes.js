import express from "express";

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
routes.get("/order/:id", OrderController.show);
routes.post("/order", OrderController.store);
routes.put("/order/:id", OrderController.update);
routes.delete("/order/:id", OrderController.destroy);

module.exports = routes;
