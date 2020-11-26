const nodeoutlook = require("nodejs-nodemailer-outlook");
const sgMail = require("@sendgrid/mail");

const send = (reply, incharge) => {
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: reply, // Change to your recipient
    from: "chilelegal-hackathon@outlook.com", // Change to your verified sender
    subject: "Respuesta de Chile Legal!",
    text: "and easy to do anywhere, even with Node.js",
    html: `<p> Hemos recibido tu mensaje. Tu solicitud ha sido asignada a <b> ${incharge} </b>. </p>
    <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
         <br><br><br>

         <h1>ACCENTURE</h1>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent", reply);
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendEmailIncharge = (destination, subject, attachments, html, reply) => {
  sgMail.setApiKey(
    "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"
  );

  let attachmentsModified = attachments.map((attachment) => {
    return {
      filename: attachment.fileName,
      contentType: attachment.contentType,
      content: attachment.content,
    };
  });

  const msg = {
    to: destination, // Change to your recipient
    from: "chilelegal-hackathon@outlook.com", // Change to your verified sender
    subject: subject,
    text: "",
    html: html,
    files: attachmentsModified,
    replyTo: reply,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { send, sendEmailIncharge };

// const send = (reply, incharge) => {
//   nodeoutlook.sendEmail({
//     auth: {
//       user: "chilelegal-hackathon@outlook.com",
//       pass: "chilelegal2020",
//     },
//     from: "chilelegal-hackathon@outlook.com",
//     to: reply,
//     subject: "Respuesta de Chile Legal!",
//     html: `<p> Hemos recibido tu mensaje. Tu solicitud ha sido asignada a <b> ${incharge} </b>. </p>
//     <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
//          <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
//          <br><br><br>

//          <h1>ACCENTURE</h1>`,
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
//       user: "pruebalegal2@outlook.com",
//       pass: "chilelegal2020",
//     },
//     from: "pruebalegal2@outlook.com",
//     to: destination,
//     subject: subject,
//     html: html,
//     attachments: attachments,
//     replyTo: reply,
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i),
//   });
// };
