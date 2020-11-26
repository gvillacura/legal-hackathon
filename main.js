const { findKeywords } = require("./firebase");
const { send, sendEmailIncharge } = require("./sendEmail");
const { keyword } = require("./keyword");

const notifier = require("mail-notifier");

const imap = {
  user: "chilelegal-hackathon@outlook.com",
  password: "chilelegal2020",
  host: "imap.outlook.com",
  port: 993, // imap port
  tls: true, // use secure connection
  tlsOptions: { rejectUnauthorized: false },
};

notifier(imap)
  .on("mail", function (mail) {
    const keywordFound = keyword(mail.subject);

    const reply = mail.from[0].address;

    const emailPromise = findKeywords(keywordFound);
    // console.log("*****");
    // console.log(mail);
    // console.log("*****");

    //let result;
    emailPromise.then((asignationData) => {
      //TO DO: validar assignationdata !== undefined, enviar correo a felipe y otra persona
      send(reply, asignationData.incharge);
      sendEmailIncharge(
        asignationData.email,
        mail.subject,
        mail.attachments,
        mail.html,
        reply
      );
      //TO DO: definar team cuando no hay palabra clave
      //TO DO: guardar data en colección de firebase.
      // const data = {
      //   assignedAgent: asignationData.incharge,
      //   team: "?",
      //   customerId: mail.from[0].name,
      //   date: mail.date,
      //   status: "pending",
      // };
    });
  })
  .start();
