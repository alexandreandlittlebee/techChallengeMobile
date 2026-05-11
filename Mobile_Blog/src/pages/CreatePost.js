import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import api from "../services/api";

function CreatePost({ navigation }) {

  const [titulo, setTitulo] =
    useState("");

  const [autor, setAutor] =
    useState("");

  const [conteudo, setConteudo] =
    useState("");

  async function criarPost() {

    try {

      await api.post("/posts", {

        titulo,
        autor,
        conteudo

      });

      Alert.alert(
        "Sucesso",
        "Post criado"
      );

      setTitulo("");
      setAutor("");
      setConteudo("");

      navigation.navigate("Admin");

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível criar o post"
      );

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Criar Post
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={criarPost}
      >

        <Text style={styles.textoBotao}>
          Criar Post
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

  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    height: 120,
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

export default CreatePost;