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

function EditProfessor({ route, navigation }) {

  const { professor } = route.params;

  const [nome, setNome] =
    useState(professor.nome);

  const [email, setEmail] =
    useState(professor.email);

  async function salvar() {

    try {

      await api.put(
        `/professores/${professor._id}`,
        {
          nome,
          email
        }
      );

      Alert.alert(
        "Sucesso",
        "Professor atualizado"
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível atualizar"
      );

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Editar Professor
      </Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >

        <Text style={styles.textoBotao}>
          Salvar
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

export default EditProfessor;