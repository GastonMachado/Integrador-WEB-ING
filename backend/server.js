const express = require('express');
const app = express();

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Backend en funcionamiento');
});

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});
