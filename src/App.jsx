// App.js

import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";
const urlBaseServer = "http://localhost:3000"; // Asegúrate de que esta URL sea la correcta

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${urlBaseServer}/api/posts`);
      console.log('Respuesta del servidor:', response.data);
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener posts", error);
      setError("Error al obtener posts. Consulta la consola para más detalles.");
    }
  };

  const agregarPost = async () => {
    try {
      const post = { titulo, img: imgSrc, descripcion };
      await axios.post(`${urlBaseServer}/api/posts`, post);
      // Después de agregar un nuevo post, obtenemos nuevamente la lista de posts
      getPosts();
    } catch (error) {
      console.error("Error al agregar un nuevo post", error);
      setError("Error al agregar un nuevo post. Consulta la consola para más detalles.");
    }
  };

  const like = async (id) => {
    try {
      await axios.put(`${urlBaseServer}/api/posts/like/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error al dar like a un post", error);
      setError("Error al dar like a un post. Consulta la consola para más detalles.");
    }
  };

  const eliminarPost = async (id) => {
    try {
      await axios.delete(`${urlBaseServer}/api/posts/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error al eliminar un post", error);
      setError("Error al eliminar un post. Consulta la consola para más detalles.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
