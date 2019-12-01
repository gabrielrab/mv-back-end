import express from "express";
import mongoose from "mongoose";

const User = mongoose.model("Tabela");

module.exports = {
  async index(req, res) {
    //const user = await User.find();
    return "Cu";
  }
};
