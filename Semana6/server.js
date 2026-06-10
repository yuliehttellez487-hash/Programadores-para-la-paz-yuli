
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const ARCHIVO = 'tareas.json';

// Leer tareas del archivo
function leerTareas() {
    return JSON.parse(fs.readFileSync(ARCHIVO));
}

// Guardar tareas al archivo
function guardarTareas(tareas) {
    fs.writeFileSync(ARCHIVO, JSON.stringify(tareas, null, 2));
}

// 1. POST /tareas - Crear tarea nueva
app.post('/tareas', (req, res) => {
    const tareas = leerTareas();
    const nuevaTarea = {
        id: Date.now(),
        texto: req.body.texto,
        completada: false
    };
    tareas.push(nuevaTarea);
    guardarTareas(tareas);
    res.json({ mensaje: 'Tarea creada', tarea: nuevaTarea });
});

// 2. GET /tareas - Listar todas
app.get('/tareas', (req, res) => {
    const tareas = leerTareas();
    res.json(tareas);
});

// 3. PUT /tareas/:id - Marcar completada
app.put('/tareas/:id', (req, res) => {
    const tareas = leerTareas();
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = true;
        guardarTareas(tareas);
        res.json({ mensaje: 'Tarea completada', tarea });
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

// 4. DELETE /tareas/:id - Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
    let tareas = leerTareas();
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas(tareas);
    res.json({ mensaje: 'Tarea eliminada' });
});

app.listen(3000, () => {
    console.log('API Tareas en puerto 3000');
});
