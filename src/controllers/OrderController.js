import express from "express";
import mongoose from "mongoose";

const Order = mongoose.model("OrderShema");

module.exports = {
  async index(req, res) {
    try {
      const orders = await Order.find();
      return res.status(200).send(orders);
    } catch (error) {
      console.log(`[api] - Error on index order: ${error}`);
      return res.status(400).send({ error: `Error on index order: ${error}` });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      console.log(`[api] - Show order: ${order.id}`);
      return res.status(200).send(order);
    } catch (error) {
      console.log(`[api] - Error on order: ${error}`);
      return res.status(400).send({ error: `Error on show order: ${error}` });
    }
  },

  async store(req, res) {
    try {
      const data = req.body;
      const order = await Order.create({ ...data });
      //Iniciar job
      //Emit socket para o client
      console.log(`[api] - Created order: ${order.id}`);
      return res.status(200).send({ order });
    } catch (error) {
      console.log(`[api] - Error to created order: ${error}`);
      return res.status(400).send({ error: `Order dont created: ${error}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      let order = await Order.findById(id);
      order.status === 1
        ? ((order = await Order.findByIdAndUpdate(id, { ...data })),
          //Emit de socket
          //Jobs de email para atualizaão
          console.log(`[api] - Updated order: ${order.id}`),
          res.status(200).send({ order }))
        : (console.log(
            `[api] - Order ${order.id} cannot be updated as it is already in production`
          ),
          res.status(401).send({
            error: `[api] - Order ${order.id} cannot be updated as it is already in production`
          }));
    } catch (error) {
      console.log(`[api] - Error to update order: ${error}`);
      return res.status(400).send({ error: `Order dont updated: ${error}` });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndRemove(id);
      console.log(`[api] - Order deleted: ${id} `);
      return res.status(200).send("Dleted success");
    } catch (error) {
      console.log(`[api] - Error to deleted order: ${error}`);
      return res.status(400).send({ error: `Order dont deteled: ${error}` });
    }
  }
};
