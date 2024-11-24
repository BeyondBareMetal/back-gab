const express = require('express');
const bodyParser = require('body-parser');
const { MailerSend } = require('mailersend');
const cors = require('cors')

const app = express();
const PORT = 5000;

// Configuración de Middlewares
app.use(bodyParser.json());
app.use(cors())

// Configuración de MailerSend
const mailersend = new MailerSend({
  apiKey: 'mlsn.bd4baf89f0399b3455f9ca6690f96e00385b5e577cd2c27df495df29259ce94c', // Sustituye con tu clave de API
});

// Endpoint para enviar el correo
app.post('/send-email', async (req, res) => {
    console.log(req.body)
  const { name, email, message, subject } = req.body;

  try {
    const emailData = {
        from: {
          email: 'MS_idVTRl@beyondbaremetal.com', // Correo válido asociado a tu dominio
          name: name // Opcional: el nombre del remitente
        },
        to: [
          {
            email: 'cuentabnbn11@gmail.com', // Correo del destinatario
            name: 'Destinatario' // Opcional: el nombre del destinatario
          }
        ],
        subject: subject,
        text: `You got a new message: ${name}
      
            Nombre: ${name}
            
            Email: ${email}
            
            Mensaje:${message}`
      };
      

    console.log(emailData)

    // Enviar correo
    await mailersend.email.send(emailData);
    res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    console.log(error.body.errors)
    res.status(500).json({ message: 'Hubo un error al enviar el correo.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
