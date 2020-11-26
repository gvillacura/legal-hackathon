const { findKeywords, saveData } = require("./firebase");
const {
  send,
  sendEmailIncharge,
  noChargeEmail,
  sendEmailTwoIncharge,
} = require("./sendEmail");
const { keyword } = require("./keyword");

const notifier = require("mail-notifier");

const imap = {
  user: "legal202020@outlook.com",
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
      console.log(asignationData);
      if (asignationData.keyword === "NONE") {
        noChargeEmail(reply);
        setTimeout(() => {
          sendEmailTwoIncharge(
            asignationData.email,
            mail.subject,
            mail.attachments,
            mail.html,
            reply,
            asignationData.email2
          );
          data = {
            assignedAgent: asignationData.incharge,
            team: asignationData.keyword,
            customerId: mail.from[0].name,
            date: mail.date,
            status: "pending",
          };
          saveData(data);
        }, 5000);
      } else {
        send(reply, asignationData.incharge);
        setTimeout(() => {
          sendEmailIncharge(
            asignationData.email,
            mail.subject,
            mail.attachments,
            mail.html,
            reply
          );
          data = {
            assignedAgent: asignationData.incharge,
            team: asignationData.keyword,
            customerId: mail.from[0].name,
            date: mail.date,
            status: "pending",
          };
          saveData(data);
        }, 5000);
      }
      //TO DO: definar team cuando no hay palabra clave
      //TO DO: guardar data en colección de firebase.
    });
  })
  .start();
