const sgMail = require("@sendgrid/mail");

const send = (reply, incharge) => {
  const msg = {
    to: reply,
    subject: "Respuesta de Chile Legal!",
    html: `<p> Hemos recibido tu mensaje. Tu solicitud ha sido asignada a <b> ${incharge} </b>. </p>
    <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
         <br><br><br>
         
         <h1>ACCENTURE</h1>`,
    text: "",
    attachments: null,
  };

  console.log(msg);
  sendEmail(msg);
};

const noChargeEmail = (reply) => {
  console.log("noChargeEmail");

  const msg = {
    to: reply,
    subject: "Respuesta de Chile Legal!",
    html: `<p>Hemos recibido tu solicitud y estamos asignando tu requerimiento. </p>
    <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
         <br><br><br>
         
         <h1>ACCENTURE</h1>`,
    text: "",
    attachments: null,
  };

  sendEmail(msg);
};

const sendEmailIncharge = (
  destination,
  subject,
  attachments,
  html,
  reply,
  destination2
) => {
  console.log(destination2);

  const msg = {
    to: destination,
    subject: subject,
    html: html,
    attachments: attachments,
  };

  sendEmail(msg);
};

const sendEmail = (msg) => {
  let attachmentsMod = [];
  if (msg.attachments !== undefined && msg.attachments !== null) {
    attachmentsMod = attachments.map((attachment) => {
      const content = attachment.content.toString("base64");
      return {
        content: content,
        filename: attachment.fileName,
        type: attachment.contentType,
      };
    });
  }

  sgMail.setApiKey(
    "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"
  );
  const msgToSend = {
    to: msg.to,
    from: "chilelegal-hackathon@outlook.com",
    subject: msg.to,
    text: msg.text,
    html: msg.html,
    attachments: attachmentsMod,
  };
  console.log(msgToSend);
  sgMail
    .send(msgToSend)
    .then(() => {
      console.log("Email sent to", msgToSend.to);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { send, sendEmailIncharge, noChargeEmail };
