const nodeoutlook = require("nodejs-nodemailer-outlook");

const send = (destination, reply) => {
  nodeoutlook.sendEmail({
    auth: {
      user: "pruebalegal2020@outlook.com",
      pass: "chilelegal2020",
    },
    from: "pruebalegal2020@outlook.com",
    to: destination + "," + reply,
    subject: "Hey you, awesome!",
    html: "<b>Tu solicitud está siendo asignada</b>",
    text: "This is text version!",
    replyTo: "",
    attachments: [],
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
};

module.exports = { send };
