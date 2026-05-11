import { useCallback, useState } from "react";
 
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
 
import { useFocusEffect } from "@react-navigation/native";
 
import api from "../services/api";
 
function ListAluno({ navigation }) {
 
  const [alunos, setAlunos] =
    useState([]);
 
  useFocusEffect(
 
    useCallback(() => {
 
      carregarAlunos();
 
    }, [])
 
  );
 
  async function carregarAlunos() {
 
    try {
 
      const response =
        await api.get("/alunos");
 
      setAlunos(response.data);
 
    } catch (error) {
 
      console.log(error);
 
    }
 
  }
 
  function excluirAluno(id) {
 
    if (!id) return;
 
    const confirmou = window.confirm(
      "Deseja excluir o aluno?"
    );
 
    if (confirmou) {
      api.delete(`/alunos/${id}`)
        .then(() =>
          setAlunos((prev) =>
            prev.filter(
              aluno =>
                (aluno._id || aluno.id) !== id
            )
          )
        )
        .catch((error) => console.log(error));
    }
 
  }
 
  return (
 
    <View style={styles.container}>
 
      <Text style={styles.titulo}>
        Alunos
      </Text>
 
      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={() =>
          navigation.navigate("CreateAluno")
        }
      >
 
        <Text style={styles.textoBotao}>
          Novo Aluno
        </Text>
 
      </TouchableOpacity>
 
      <FlatList
        data={alunos}
        keyExtractor={(item) =>
          item._id || item.id
        }
        renderItem={({ item }) => (
 
          <View style={styles.card}>
 
            <Text style={styles.nome}>
              {item.nome}
            </Text>
 
            <Text>
              {item.email}
            </Text>
 
            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() =>
                navigation.navigate(
                  "EditAluno",
                  {
                    aluno: item
                  }
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
                excluirAluno(item._id || item.id)
              }
            >
 
              <Text style={styles.textoBotao}>
                Excluir
              </Text>
 
            </TouchableOpacity>
 
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
    backgroundColor: "#f5f1e6"
  },
 
  titulo: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
    fontWeight: "bold"
  },
 
  botaoCriar: {
    backgroundColor: "#2f6fcf",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20
  },
 
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
 
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
 
  botaoEditar: {
    backgroundColor: "#2f6fcf",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10
  },
 
  botaoExcluir: {
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
 
export default ListAluno;