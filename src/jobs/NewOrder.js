import Mail from "../lib/Mail";
import edge from "edge.js";
import path from "path";

edge.registerViews(path.resolve(__dirname, "..", "view"));

export default {
  key: "NewOrder",
  async handle({ data }) {
    const { order } = data;
    await Mail.sendMail({
      from: process.env.MAIL_SENDER,
      to: process.env.MAIL_SENDER,
      subject: "Novo Pedido",
      html: edge.render("neworder", { order })
    });
  }
};
