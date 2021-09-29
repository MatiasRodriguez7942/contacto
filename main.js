const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set("port", process.env.PORT || 3000);

app.post("/contacto", function (req, res) {
  var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m.rodriguez@agencialosnavegantes.cl",
      pass: "agencia2020$$",
    },
  });
  console.log(req.body.nombre)
  var mailOptiones = {
    from:  req.body.email,
    to: "m.rodriguez@agencialosnavegantes.cl",
    subject: "Enviado desde nodemailer",
    html: req.body.mensajes,
  };
  transpoter.sendMail(mailOptiones, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado");
      res.status(200).jsonp(req.body);
    }
  });
});

app.listen((process.env.PORT || 3000), function(){
    console.log('listening on *:5000');
  });
// app.listen(app.get("port"), () => {
// console.log(`Server on port ${app.get("port")}`);
// });
