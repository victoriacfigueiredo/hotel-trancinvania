import bodyParser from 'body-parser';
import app from './app';
// import nodemailer from "nodemailer"

const PORT = process.env.PORT || 5001;
// const USER_EMAIL = process.env.USER_EMAIL;
// const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: USER_EMAIL,
//     pass: PASSWORD_EMAIL,
//   },
// });

// async function main() {
//   const info = await transporter.sendMail({
//     from: '"Hotel Trancinvânia 👻" <hoteltrancinvania@gmail.com>',
//     to: process.env.USER_EMAIL,
//     subject: "Oi Vitória", 
//     html: "Teste de envio automático", 
//   });

//   console.log("Message sent: %s", info.messageId);
// }

// main().catch(console.error);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
});
