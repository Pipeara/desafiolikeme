const { Pool } = require('pg');

const pool = new Pool({
  user: 'felipearacena',
  host: 'localhost',
  database: 'likeme',
  password: '',
  port: 5432,
});

const obtenerPosts = async () => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los posts', error);
    throw new Error('Error interno del servidor');
  }
};

const crearNuevoPost = async (titulo, img, descripcion, likes) => {
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, img, descripcion, likes]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error al crear un nuevo post', error);
    throw new Error('Error interno del servidor');
  }
};

module.exports = {
  obtenerPosts,
  crearNuevoPost,
};
