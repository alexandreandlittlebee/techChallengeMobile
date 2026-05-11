import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import api from "../services/api";

function EditPost({ route, navigation }) {

  const { id } = route.params;

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {

    carregarPost();

  }, []);

  async function carregarPost() {

    try {

      const response = await api.get(`/posts/${id}`);

      setTitulo(response.data.titulo);
      setAutor(response.data.autor);
      setConteudo(response.data.conteudo);

    } catch (error) {

      console.log(error);

    }

  }

  async function atualizarPost() {

    try {

      await api.put(`/posts/${id}`, {
        titulo,
        autor,
        conteudo
      });

      Alert.alert(
        "Sucesso",
        "Post atualizado"
      );

      navigation.navigate("Admin");

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Editar Post
      </Text>

      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
      />

      <TextInput
        style={styles.textarea}
        multiline
        value={conteudo}
        onChangeText={setConteudo}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={atualizarPost}
      >

        <Text style={styles.textoBotao}>
          Atualizar
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f1e6"
  },

  titulo: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#2f6fcf",
    fontWeight: "bold"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },

  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    height: 150,
    textAlignVertical: "top"
  },

  botao: {
    backgroundColor: "#2f6fcf",
    padding: 15,
    borderRadius: 8
  },

  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});

export default EditPost;