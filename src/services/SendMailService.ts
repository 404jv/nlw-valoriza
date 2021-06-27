import nodemailer, { Transporter } from 'nodemailer';
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';

interface IMessage {
  user_id: string;
  subject: string;
  text: string;
}

class SendMailService {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'jeanne.hagenes21@ethereal.email',
        pass: 'RZFaNquPyJUUHpHgps' 
      }
    });

    this.client = transporter;
  }

  async execute({ user_id, subject, text }: IMessage) {
    const usersRepositories = getCustomRepository(UserRepositories);

    const user = await usersRepositories.findOne(user_id);

    const message = await this.client.sendMail({
      from: 'smtp.ethereal.email',
      to: user.email,
      subject,
      text,
      html: `<p>${text}</p>`,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { SendMailService };
