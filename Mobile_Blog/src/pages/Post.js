 import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";

import api from "../services/api";

function Post({ route }) {

  const { id } = route.params;

  const [post, setPost] = useState(null);

  useEffect(() => {

    carregarPost();

  }, []);

  async function carregarPost() {

    try {

      const response = await api.get(`/posts/${id}`);

      setPost(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!post) {

    return (

      <View style={styles.loading}>

        <Text>
          Carregando...
        </Text>

      </View>

    );

  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        {post.titulo}
      </Text>

      <Text style={styles.autor}>
        Autor: {post.autor}
      </Text>

      <Text style={styles.conteudo}>
        {post.conteudo}
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ece7dc"
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2f6fcf",
    marginBottom: 15
  },

  autor: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555"
  },

  conteudo: {
    fontSize: 18,
    lineHeight: 28
  }

});

export default Post;