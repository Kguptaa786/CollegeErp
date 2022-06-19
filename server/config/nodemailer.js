const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, password, registrationNumber, name) => {
  try {
    const output = `
        <p>You have a new message</p>
        <h3>Welcome to CollegeERP</h3>
        <ul>
        <li>Credential</li>
        <li>Name: ${name}</li>
        <li>Registration Number: ${registrationNumber}</li>
        <li>Password: ${password}</li>
        </ul>
        <p><b>Note: Please change your password</b></p>
    `;
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "dummyForWebDev@outlook.com", // generated ethereal user
        pass: `${process.env.EMAIL_PASSWORD}`, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"CollegeERP 👻" <dummyForWebDev@outlook.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Your CollegeERP credential", // Subject line
      text: "Welcome to CollegeERP", // plain text body
      html: output,
    });
    console.log("send");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = mailSender;
