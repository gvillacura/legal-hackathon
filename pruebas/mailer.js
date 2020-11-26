const nodemailer = require("nodemailer");
const express = require("express");
const ejs = require("ejs");

const app = express();

app.get("/sendmail", async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  //servicio de test mailtrap
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f5eccbfc15eb2a",
      pass: "9466d9c1583f21",
    },
  });

  let message = await transport.sendMail({
    from: '"Fred Foo 👻" <cliente1-hackathon@outlook.com>', // sender address
    to: "chilelegal-hackathon@outlook.com", // list of receivers
    subject: "Respuesta de chile legal ✔", // Subject line
    text: "helo", // plain text body
    html: `<b>HOLAAAA</b>`, // html body
  });

  res.send("e-mail enviando");
});

app.get("/sendhtml", (req, res) => {
  ejs.renderFile(__dirname + " /email.ejs", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f5eccbfc15eb2a",
          pass: "9466d9c1583f21",
        },
      });

      let mailOptions = {
        from: '"Fred Foo 👻" <cliente1-hackathon@outlook.com>', // sender address
        to: "chilelegal-hackathon@outlook.com", // list of receivers
        subject: "Respuesta chile-legal", // Subject line
        html: data,
      };
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("mensaje enviada");
        }
      });
    }
  });
  res.send("e-mail enviado");
});

app.listen(3001, () => {
  console.log("puerto 3001");
});

// send mail with defined transport object

//   console.log("Message sent: %s", info.messageId);
//   let mailOptions = {
//     from: "'Pessoa teste' cliente1-hackathon@outlook.com",
//   };
//   res.send("e-mail enviado");
// });

// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

// main().catch(console.error);
