import Mail from "../lib/Mail";
import edge from "edge.js";
import path from "path";

edge.registerViews(path.resolve(__dirname, "..", "view"));

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: process.env.MAIL_SENDER,
      to: `${user.name} <${user.email}>`,
      subject: "Bem vindo ao sistema de pedidos Master Vidros",
      html: edge.render("register", { username: user.name })
    });
  }
};
