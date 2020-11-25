const nodeoutlook = require("nodejs-nodemailer-outlook");

const send = (destination, reply, incharge) => {
  nodeoutlook.sendEmail({
    auth: {
      user: "bhp-hackathon@outlook.com",
      pass: "chilelegal2020",
    },
    from: "bhp-hackathon@outlook.com",
    to: destination + "," + reply,
    subject: "Respuesta de Chile Legal!",
    html: `<p> Hemos recibido tu mensaje. Tu solicitud ha sido asignada a <b> ${incharge} </b>. </p>
    <p>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, igresa al siguiente link:</p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b></p>
         <br><br><br>
         
         <h1>ACCENTURE</h1>`,
    text: "This is text version!",
    replyTo: "",
    attachments: [],
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
};

module.exports = { send };
