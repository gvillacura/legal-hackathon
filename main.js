const { findKeywords } = require("./firebase");
const { send } = require("./sendEmail");

const notifier = require("mail-notifier");
const re = /\[(\w+)\]/i;
const imap = {
  user: "pruebalegal2020@outlook.com",
  password: "chilelegal2020",
  host: "imap.outlook.com",
  port: 993, // imap port
  tls: true, // use secure connection
  tlsOptions: { rejectUnauthorized: false },
};

notifier(imap)
  .on("mail", function (mail) {
    console.log(mail.from[0].address);
    const keywordMatch = mail.subject.match(re);
    console.log(keywordMatch);
    const keyword = keywordMatch[1];
    const reply = mail.from[0].address;

    const emailPromise = findKeywords(keyword);

    //let result;
    emailPromise.then((email) => {
      send(email, reply);
    });
  })
  .start();
