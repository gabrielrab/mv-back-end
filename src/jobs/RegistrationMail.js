import Mail from "../lib/Mail";

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: "teste@teste.com",
      to: `${user.name} <${user.email}>`,
      html: `Olá, ${user.name} bem vindo ao sistema `
    });
  }
};
