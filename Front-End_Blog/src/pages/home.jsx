import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {

  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState("");

  const token = localStorage.getItem("token");

  function carregarPosts() {
    api.get("/posts")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  function excluirPost(id) {

    if (!window.confirm("Deseja realmente excluir este post?")) return;

    api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      carregarPosts();
    })
    .catch(error => {
      console.error(error);
    });

  }

  const postsFiltrados = posts.filter(post =>
    post.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>

      <h1 style={{ textAlign: "center", color: "#2f6fcf" }}>
        Posts das Matérias
      </h1>

      <div style={{ marginBottom: "20px" }}>

        <Link to="/admin">
          <button>Criar Post</button>
        </Link>

        {!token && (
          <Link to="/login">
            <button>Login Professor</button>
          </Link>
        )}

        {token && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}

      </div>

      <input
        type="text"
        placeholder="Buscar posts..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <br/><br/>

      {postsFiltrados.map(post => (

        <div key={post._id}>

          <Link to={`/post/${post._id}`}>
            <h2>{post.titulo}</h2>
          </Link>

          <p><strong>Autor:</strong> {post.autor}</p>

          <p>
            {post.conteudo.length > 120
              ? post.conteudo.substring(0,120) + "..."
              : post.conteudo}
          </p>

          <Link to={`/edit/${post._id}`}>
  <button>Editar</button>
</Link>

          <button onClick={() => excluirPost(post._id)}>
            Excluir
          </button>

          <hr/>

        </div>

      ))}

    </div>
  );

}

export default Home;