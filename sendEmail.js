const sgMail = require("@sendgrid/mail");

const send = (reply, incharge) => {
  const msg = {
    to: reply,
    subject: "Respuesta de Chile Legal!",
    html: `<p> Hemos recibido tu mensaje. Tu solicitud ha sido asignada a <b> ${incharge} </b>. </p>
    <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
         <br><br><br>
         
         <img src="https://postimg.cc/D8dtDrzJ" alt="" />`,

    text: "",
    attachments: null,
  };

  //console.log(msg);
  sendEmail(msg);
};

const noChargeEmail = (reply) => {
  //console.log("noChargeEmail");

  const msg = {
    to: reply,
    subject: "Respuesta de Chile Legal!",
    html: `<p>Hemos recibido tu solicitud y estamos asignando tu requerimiento. </p>
    <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
         <br><br><br>
         
         <img src="https://postimg.cc/D8dtDrzJ" alt="" />`,

    text: "",
    attachments: null,
  };

  sendEmail(msg);
};

const sendEmailIncharge = (destination, subject, attachments, html, reply) => {
  const msg = {
    to: destination,
    subject: subject,
    html: `<p> Solicitud enviada por: <b> ${reply} </b></p><br>` + html,
    attachments: attachments,
  };

  sendEmail(msg);
};

const sendEmailTwoIncharge = (
  destination,
  subject,
  attachments,
  html,
  reply,
  destination2
) => {
  const msg = {
    to: destination,
    cc: destination2,
    subject: subject,
    html: `<p> Solicitud enviada por: <b> ${reply} </b></p><br>` + html,
    attachments: attachments,
  };

  sendEmail(msg);
};

const sendEmail = (msg) => {
  let attachmentsMod = [];
  if (msg.attachments !== undefined && msg.attachments !== null) {
    attachmentsMod = msg.attachments.map((attachment) => {
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

  const personalizations = [
    {
      to: [{ email: msg.to }],
    },
  ];

  if (msg.cc !== undefined && msg.cc !== null && msg.cc !== "") {
    personalizations[0].to.push({ email: msg.cc });
  }
  const msgToSend = {
    personalizations: personalizations,
    from: "chilelegal-2020@outlook.com",
    subject: msg.subject,
    content: [
      {
        type: "text/html",
        value: msg.html,
      },
    ],
    attachments: attachmentsMod,
  };

  sgMail
    .send(msgToSend)
    .then(() => {
      console.log("Email sent to", personalizations[0].to);
    })
    .catch((error) => {
      const { message, code, response } = error;
      console.error(`${error.code} :${error.message}`);
      console.log(response);
      console.log(response.body.errors);
    });
};

module.exports = {
  send,
  sendEmailIncharge,
  noChargeEmail,
  sendEmailTwoIncharge,
};

// const nodeoutlook = require("nodejs-nodemailer-outlook");

// const send = (reply, incharge) => {
//   nodeoutlook.sendEmail({
//     auth: {
//       user: "legal202020@outlook.com",
//       pass: "chilelegal2020",
//     },
//     from: "legal202020@outlook.com",
//     to: reply,
//     subject: "Respuesta de Chile Legal!",
//     html: `<p> Hemos recibido tu mensaje. Tu solicitud ha sido asignada a <b> ${incharge} </b>. </p>
//     <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
//          <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
//          <br><br><br>

//          <img href="./img/logo-accenture.jpeg" alt="" />`,

//     text: "This is text version!",
//     replyTo: "",
//     attachments: [],
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i),
//   });
// };

// const noChargeEmail = (reply) => {
//   console.log("noChargeEmail");
//   nodeoutlook.sendEmail({
//     auth: {
//       user: "legal202020@outlook.com",
//       pass: "chilelegal2020",
//     },
//     from: "legal202020@outlook.com",
//     to: reply,
//     subject: "Respuesta de Chile Legal!",
//     html: `<p>Hemos recibido tu solicitud y estamos asignando tu requerimiento. </p>
//     <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
//          <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
//          <br><br><br>

//          <img href="./img/logo-accenture.jpeg" alt="" />`,
//     text: "This is text version!",
//     replyTo: "",
//     attachments: [],
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i),
//   });
// };

// const sendEmailIncharge = (destination, subject, attachments, html, reply) => {
//   nodeoutlook.sendEmail({
//     auth: {
//       user: "legal202020@outlook.com",
//       pass: "chilelegal2020",
//     },
//     from: "legal202020@outlook.com",
//     to: destination,
//     subject: subject,
//     html: html,
//     attachments: attachments,
//     replyTo: reply,
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i),
//   });
// };

// const sendEmailTwoIncharge = (
//   destination,
//   subject,
//   attachments,
//   html,
//   reply,
//   destination2
// ) => {
//   console.log(destination2);
//   nodeoutlook.sendEmail({
//     auth: {
//       user: "legal202020@outlook.com",
//       pass: "chilelegal2020",
//     },
//     from: "legal202020@outlook.com",
//     to: destination2 + ", " + destination,
//     subject: subject,
//     html: html,
//     attachments: attachments,
//     replyTo: reply,
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i),
//   });
// };
// module.exports = {
//   send,
//   sendEmailIncharge,
//   noChargeEmail,
//   sendEmailTwoIncharge,
// };
