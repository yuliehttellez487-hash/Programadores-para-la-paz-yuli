const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let reportes = [];

app.get('/', (req, res) => {
  res.send('Servidor Semana 7 funcionando!');
});

app.get('/reportes', (req, res) => {
  res.json(reportes);
});

app.post('/reportes', (req, res) => {
  const reporte = {
    id: reportes.length + 1,
    tipo: req.body.tipo,
    descripcion: req.body.descripcion
  };
  reportes.push(reporte);
  res.json({
    mensaje: "Reporte registrado",
    reporte: reporte
  });
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
