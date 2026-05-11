import { useEffect, useState } from "react";
 
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
 
import api from "../services/api";
 
function Admin({ navigation }) {
 
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
 
    carregarPosts();
 
  }, []);
 
  async function carregarPosts() {
 
    try {
 
      const response = await api.get("/posts");
 
      setPosts(response.data);
 
    } catch (error) {
 
      console.log(error);
 
    }
 
  }
 
  function excluirPost(id) {
 
    if (!id) return;
 
    const confirmou = window.confirm(
      "Deseja realmente excluir este post?"
    );
 
    if (confirmou) {
      api.delete(`/posts/${id}`)
        .then(() => carregarPosts())
        .catch((error) => console.log(error));
    }
 
  }
 
  return (
 
    <View style={styles.container}>
 
      <Text style={styles.titulo}>
        Painel do Professor
      </Text>
 
      <TouchableOpacity
        style={styles.logoutBotao}
        onPress={() =>
          navigation.navigate("Home")
        }
      >
 
        <Text style={styles.textoBotao}>
          Logout
        </Text>
 
      </TouchableOpacity>
 
      <Text style={styles.subtitulo}>
        Gerenciamento
      </Text>
 
      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={() =>
          navigation.navigate("CreatePost")
        }
      >
 
        <Text style={styles.textoBotao}>
          Criar Post
        </Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={() =>
          navigation.navigate("ListProfessor")
        }
      >
 
        <Text style={styles.textoBotao}>
          Professores
        </Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={() =>
          navigation.navigate("ListAluno")
        }
      >
 
        <Text style={styles.textoBotao}>
          Alunos
        </Text>
 
      </TouchableOpacity>
 
      <Text style={styles.subtitulo}>
        Editar ou Excluir Posts
      </Text>
 
      <FlatList
        data={posts}
        keyExtractor={(item) =>
          item._id || item.id
        }
        renderItem={({ item }) => (
 
          <View style={styles.post}>
 
            <Text style={styles.postTitulo}>
              {item.titulo}
            </Text>
 
            <View style={styles.botoesContainer}>
 
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() =>
                  navigation.navigate(
                    "EditPost",
                    { id: item._id || item.id }
                  )
                }
              >
 
                <Text style={styles.textoBotao}>
                  Editar
                </Text>
 
              </TouchableOpacity>
 
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() =>
                  excluirPost(item._id || item.id)
                }
              >
 
                <Text style={styles.textoBotao}>
                  Excluir
                </Text>
 
              </TouchableOpacity>
 
            </View>
 
          </View>
 
        )}
      />
 
    </View>
 
  );
 
}
 
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ece7dc"
  },
 
  titulo: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
    fontWeight: "bold"
  },
 
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
    color: "#444"
  },
 
  logoutBotao: {
    backgroundColor: "#c0392b",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  },
 
  botaoMenu: {
    backgroundColor: "#2f6fcf",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
 
  post: {
    backgroundColor: "#fdfdfd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
 
  postTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222"
  },
 
  botoesContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15
  },
 
  botaoEditar: {
    flex: 1,
    backgroundColor: "#2f6fcf",
    padding: 10,
    borderRadius: 8
  },
 
  botaoExcluir: {
    flex: 1,
    backgroundColor: "#c0392b",
    padding: 10,
    borderRadius: 8
  },
 
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
 
});
 
export default Admin;