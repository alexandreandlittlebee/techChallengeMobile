import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

function Login({ navigation }) {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {

    if (
      usuario === "professor" &&
      senha === "raissinha"
    ) {

      navigation.navigate("Admin");

    } else {

      Alert.alert(
        "Erro",
        "Usuário ou senha inválidos"
      );

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Login Professor
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={fazerLogin}
      >

        <Text style={styles.textoBotao}>
          Entrar
        </Text>

      </TouchableOpacity>

     

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ece7dc"
  },

  titulo: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
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
  },

  info: {
    textAlign: "center",
    marginTop: 10,
    color: "#555"
  }

});

export default Login;