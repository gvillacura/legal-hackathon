const nodeoutlook = require("nodejs-nodemailer-outlook");

const send = (destination, reply) => {
  nodeoutlook.sendEmail({
    auth: {
      user: "pruebalegal2020@outlook.com",
      pass: "chilelegal2020",
    },
    from: "pruebalegal2020@outlook.com",
    to: destination + "," + reply,
    subject: "Respuesta de Chile Legal!",
    html: `<h3> Su solicitud fue recibida y será procesada por el sector correspondiente</h3>
    <p><b>Para tener una mayor información de nuestro equipo y áreas a las que prestan soporte, ingresa al siguiente link:</b></p>
         <p><b><a href="https://www.accenture.com/cl-es">Chile legal-Santiago</a></b>
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
