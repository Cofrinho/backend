import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const EmailService = {
  async sendEmailVerification(to, token) {
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Confirma aí e bora pro Cofrinho! 💰',
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="text-align: center;">
        <div style="margin-bottom: 24px;">
          <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="60" alt="Envelope Icon" style="display: block; margin: 0 auto;" />
        </div>
        <h2 style="color: #111827; font-size: 20px;">Só falta confirmar seu e-mail 🐽</h2>
        <p style="color: #4B5563; font-size: 14px; margin-bottom: 24px;">Olá!
        Alguém (esperamos que tenha sido você) usou este e-mail para criar uma conta no Cofrinho — o app que ajuda grupos a saírem do caos financeiro.
        Pra garantir a segurança confirme seu e-mail clicando aqui:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #3B82F6; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 500; font-size: 14px;">
          Confirmar e-mail
        </a>
        <p style="color: #4B5563; font-size: 14px; margin-bottom: 24px;"> Até breve,
        Equipe Cofrinho 💸</p>
        <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">Se você não reconhece essa ação, só ignore este e-mail. Prometemos não insistir. 😉</p>
      </div>
    </div>
  `,
    });
  },
};
