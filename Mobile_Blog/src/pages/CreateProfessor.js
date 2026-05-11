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

function CreateProfessor({ navigation }) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function cadastrarProfessor() {

    try {

      await api.post("/professores", {
        nome,
        email
      });

      Alert.alert(
        "Sucesso",
        "Professor cadastrado"
      );

      setNome("");
      setEmail("");

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar"
      );

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastrar Professor
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarProfessor}
      >

        <Text style={styles.textoBotao}>
          Cadastrar
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
    color: "#444",
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

export default CreateProfessor;