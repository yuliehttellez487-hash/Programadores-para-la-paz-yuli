const express = require('express');
const app = express();

app.use(express.json());

app.get('/usuarios', (req, res) => {
  res.json({
    mensaje: "Lista de usuarios",
    usuarios: ["Ana", "Luis", "Carlos"]
  });
});

app.post('/reporte', (req, res) => {
  const mensaje = req.body.mensaje;
  res.json({
    estado: "Reporte recibido",
    mensaje: mensaje
  });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
