import { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import api from "../services/api";

function Home({ navigation }) {

  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState("");

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

  const postsFiltrados = posts.filter(post =>
    post.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Posts das Matérias
      </Text>

      <TouchableOpacity
        style={styles.botaoLogin}
        onPress={() =>
          navigation.navigate("Login")
        }
      >

        <Text style={styles.textoBotao}>
          Login Professor
        </Text>

      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Buscar posts..."
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={postsFiltrados}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.post}
            onPress={() =>
              navigation.navigate("Post", {
                id: item._id
              })
            }
          >

            <Text style={styles.postTitulo}>
              {item.titulo}
            </Text>

            <Text>
              Autor: {item.autor}
            </Text>

            <Text numberOfLines={3}>
              {item.conteudo}
            </Text>

          </TouchableOpacity>

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
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
    fontWeight: "bold"
  },

  botaoLogin: {
    backgroundColor: "#2f6fcf",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  },

  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#fff"
  },

  post: {
    backgroundColor: "#fdfdfd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },

  postTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  }

});

export default Home;