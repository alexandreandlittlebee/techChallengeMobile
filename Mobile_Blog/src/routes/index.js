import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Post from "../pages/Post";

import Login from "../pages/Login";
import Admin from "../pages/Admin";

import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";

import CreateProfessor from "../pages/CreateProfessor";
import ListProfessor from "../pages/ListProfessor";
import EditProfessor from "../pages/EditProfessor";

import CreateAluno from "../pages/CreateAluno";
import ListAluno from "../pages/ListAluno";
import EditAluno from "../pages/EditAluno";

const Stack = createNativeStackNavigator();

function Routes() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Posts"
          }}
        />

        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            title: "Leitura do Post"
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login Professor"
          }}
        />

        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            title: "Painel do Professor"
          }}
        />

        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            title: "Criar Post"
          }}
        />

        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{
            title: "Editar Post"
          }}
        />

        <Stack.Screen
          name="CreateProfessor"
          component={CreateProfessor}
          options={{
            title: "Cadastrar Professor"
          }}
        />

        <Stack.Screen
          name="ListProfessor"
          component={ListProfessor}
          options={{
            title: "Professores"
          }}
        />

        <Stack.Screen
          name="EditProfessor"
          component={EditProfessor}
          options={{
            title: "Editar Professor"
          }}
        />

        <Stack.Screen
          name="CreateAluno"
          component={CreateAluno}
          options={{
            title: "Cadastrar Aluno"
          }}
        />

        <Stack.Screen
          name="ListAluno"
          component={ListAluno}
          options={{
            title: "Alunos"
          }}
        />

        <Stack.Screen
          name="EditAluno"
          component={EditAluno}
          options={{
            title: "Editar Aluno"
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}

export default Routes;