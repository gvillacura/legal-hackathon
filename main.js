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
  user: "pruebalegal2@outlook.com",
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
    emailPromise.then((asignationData) => {
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
    });
  })
  .start();
