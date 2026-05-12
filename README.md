techChallengeMobile

Projeto acadêmico de um blog educacional com três frentes: web, back-end e mobile. A ideia é simples — professores gerenciam o conteúdo e alunos consomem. Tudo integrado via API REST.

O que tem no projeto
techChallengeMobile/
├── Back-End_Blog    → API REST com Node.js + MongoDB
├── Front-End_Blog   → Interface web em React
└── Mobile_Blog      → App mobile em React Native + Expo

Stack
Back-end — Node.js, Express, MongoDB, Mongoose, Cors
Front-end — React, Vite, Axios, React Router DOM
Mobile — React Native, Expo, React Navigation, Axios

O que cada perfil pode fazer:

Professor (admin)

- Login no painel administrativo
- Criar, editar e excluir posts
- Gerenciar professores e alunos cadastrados

Aluno

- Visualizar os posts publicados


Como rodar localmente

1. Clone o repositório
bashgit clone https://github.com/alexandreandlittlebee/techChallengeMobile.git

2. Instale as dependências de cada parte

      cd Back-End_Blog && npm install

      cd ../Front-End_Blog && npm install

      cd ../Mobile_Blog && npm install

3. Configure o banco de dados
  O projeto usa MongoDB local. Certifique-se de que o MongoDB está rodando antes de iniciar o back-end:
mongodb://localhost:27017/blog

4. Inicie cada serviço
      # Back-end → http://localhost:4000
      cd Back-End_Blog && npm start

      # Front-end → http://localhost:5173
      cd Front-End_Blog && npm run dev

      cd Mobile_Blog && npx expo start

Principais rotas da API:

ROTA:

/posts
/professores
/alunos

Descrição:

CRUD de posts
Gerenciamento de professores
Gerenciamento de alunos

Telas do app mobile
Home · Login · Admin · Professores · Alunos · Posts

Acesso de teste
Usuário: professor
Senha: xandexan

Desafios durante o desenvolvimento
Algumas coisas que deram trabalho e vale registrar:

Integrar o app mobile com a API (principalmente endereços de rede local no Expo)
Configurar o Expo e entender o fluxo de build
Manter as listas atualizadas dinamicamente após operações de CRUD
Gerenciar a navegação entre telas no React Navigation
