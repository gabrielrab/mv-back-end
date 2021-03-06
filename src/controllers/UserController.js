import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import Queue from "../lib/Queue";

const User = mongoose.model("UserSchema");

module.exports = {
  async index(req, res) {
    const user = await User.find();
    res.send(user);
  },
  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "User not find" });
    }
  },

  async showByToken(req, res) {
    const { token } = req.params;
    const decoded = jwt.verify(token, "secret");
    return res.status(200).send(decoded);
  },

  async store(req, res) {
    try {
      const data = req.body;
      const user = await User.create({ ...data });
      //Job de cadastro de usuário
      await Queue.add("RegistrationMail", { user });
      console.log(`[api] - Create user: ${user.name}`);
      return res.send({ user });
    } catch (error) {
      console.log("[api]  - Error on Created User: " + error);
      return res.send({ error: "User dont created" });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      console.log(`[api] - Update user: ${user.name}`);
      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);

      return res.status(400).send({ error: "Update user error" });
    }
  },
  async destroy(req, res) {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      console.log(`[api] - Deleted user_id: ${req.params.id}`);
      return res.status(200).send("Delete success");
    } catch (error) {
      console.log(error);
      return req.status(400).send({ error: "Delete user erros" });
    }
  },

  async authenticate(req, res) {
    const user = await User.findOne({ user: req.body.user });

    try {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      if (!(await user.compareHash(req.body.password))) {
        return res.status(401).send({ error: "Password incorrect" });
      } else {
        return res.status(200).send({ user, token: user.genereteToken() });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "User authenticate failed" });
    }
  },

  async teste(req, res) {
    const user = req.body;
    console.log("Entrou");

    //Adicionar job
    await Queue.add("RegistrationMail", { user });

    req.io.emit("Order", { user: "Gabriel Rabelo" });

    return res.send({ message: "parece que foi" });
  }
};
