import express from "express";
import mongoose from "mongoose";

const Order = mongoose.model("OrderShema");

module.exports = {
  async index(req, res) {
    try {
      const orders = Order.find();
      return res.status(200).send(orders);
    } catch (error) {
      console.log(`[api] - Error on index order: ${error}`);
    }
  },

  async store(req, res) {
    try {
      const data = req.body;
      const order = await Order.create({ ...data });
      console.log(`[api] - Created order: ${order.code}`);
      return res.status(200).send({ order });
    } catch (error) {
      console.log("[api] - Error to created order: " + error);
      return res.status(400).send({ error: "Ordern dont created" });
    }
  }
};
