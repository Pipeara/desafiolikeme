// index.js

const express = require('express');
const cors = require('cors');
const { obtenerPosts, crearNuevoPost } = require('./consulta');

const app = express();
const PORT = 3000;

// Configuración de CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5174'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;

  try {
    const nuevoPost = await crearNuevoPost(titulo, img, descripcion, likes);
    res.json(nuevoPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
