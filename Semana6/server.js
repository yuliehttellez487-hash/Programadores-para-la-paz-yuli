const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.get('/tareas', (req, res) => {
    const datos = fs.readFileSync('tareas.json', 'utf8');
    res.json(JSON.parse(datos));
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
