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
    console.log(mail);
    console.log("got mail");
  })
  .start();
