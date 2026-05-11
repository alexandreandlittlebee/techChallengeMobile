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
 
function ListProfessor({ navigation }) {
 
  const [professores, setProfessores] =
    useState([]);
 
  useFocusEffect(
 
    useCallback(() => {
 
      carregarProfessores();
 
    }, [])
 
  );
 
  async function carregarProfessores() {
 
    try {
 
      const response =
        await api.get("/professores");
 
      setProfessores(response.data);
 
    } catch (error) {
 
      console.log(error);
 
    }
 
  }
 
  function excluirProfessor(id) {
 
    if (!id) return;
 
    const confirmou = window.confirm(
      "Deseja excluir o professor?"
    );
 
    if (confirmou) {
      api.delete(`/professores/${id}`)
        .then(() => carregarProfessores())
        .catch((error) => console.log(error));
    }
 
  }
 
  return (
 
    <View style={styles.container}>
 
      <Text style={styles.titulo}>
        Professores
      </Text>
 
      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={() =>
          navigation.navigate(
            "CreateProfessor"
          )
        }
      >
 
        <Text style={styles.textoBotao}>
          Novo Professor
        </Text>
 
      </TouchableOpacity>
 
      <FlatList
        data={professores}
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
                  "EditProfessor",
                  {
                    professor: item
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
                excluirProfessor(item._id || item.id)
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
 
export default ListProfessor;