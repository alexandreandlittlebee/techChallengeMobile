
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 
console.log("SERVIDOR INICIADO");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.use((req, res, next) => {
 
  console.log(
    "Requisição recebida:",
    req.method,
    req.url
  );
 
  next();
 
});
 
mongoose.connect(
  process.env.MONGO_URL ||
  'mongodb://localhost:27017/blog'
)
.then(() => {
 
  console.log(
    'MongoDB conectado com sucesso'
  );
 
})
.catch(err => {
 
  console.error(
    'Erro ao conectar no MongoDB:',
    err
  );
 
});
 
 
 
const PostSchema = new mongoose.Schema(
 
  {
    titulo: String,
    conteudo: String,
    autor: String
  },
 
  {
    timestamps: true
  }
 
);
 
const Post = mongoose.model(
  'Post',
  PostSchema
);
 
 
const ProfessorSchema =
  new mongoose.Schema({
 
    nome: String,
    email: String
 
  });
 
const Professor = mongoose.model(
  'Professor',
  ProfessorSchema
);
 
 
 
const AlunoSchema =
  new mongoose.Schema({
 
    nome: String,
    email: String
 
  });
 
const Aluno = mongoose.model(
  'Aluno',
  AlunoSchema
);
 
 
 
app.get('/', (req, res) => {
 
  res.send(
    'API do Blog rodando 🚀'
  );
 
});
 
 
 
app.get('/posts', async (req, res) => {
 
  try {
 
    const posts = await Post.find();
 
    res.json(posts);
 
  } catch (error) {
 
    res.status(500).json({
      error: error.message
    });
 
  }
 
});
 
 
 
// ✅ CORRIGIDO: /posts/search ANTES de /posts/:id
app.get('/posts/search', async (req, res) => {
 
  const { q } = req.query;
 
  try {
 
    const posts = await Post.find({
 
      $or: [
 
        {
          titulo: {
            $regex: q,
            $options: 'i'
          }
        },
 
        {
          conteudo: {
            $regex: q,
            $options: 'i'
          }
        }
 
      ]
 
    });
 
    res.json(posts);
 
  } catch (error) {
 
    res.status(500).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.get('/posts/:id', async (req, res) => {
 
  try {
 
    const post =
      await Post.findById(req.params.id);
 
    if (!post) {
 
      return res.status(404).json({
        error: 'Post não encontrado'
      });
 
    }
 
    res.json(post);
 
  } catch (error) {
 
    res.status(400).json({
      error: 'ID inválido'
    });
 
  }
 
});
 
 
 
app.post('/posts', async (req, res) => {
 
  try {
 
    const post =
      new Post(req.body);
 
    await post.save();
 
    res.status(201).json(post);
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.put('/posts/:id', async (req, res) => {
 
  try {
 
    const post =
      await Post.findByIdAndUpdate(
 
        req.params.id,
        req.body,
        { new: true }
 
      );
 
    if (!post) {
 
      return res.status(404).json({
        error: 'Post não encontrado'
      });
 
    }
 
    res.json(post);
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.delete('/posts/:id', async (req, res) => {
 
  try {
 
    const post =
      await Post.findByIdAndDelete(
        req.params.id
      );
 
    if (!post) {
 
      return res.status(404).json({
        error: 'Post não encontrado'
      });
 
    }
 
    res.json({
      message:
        'Post removido com sucesso'
    });
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.get('/professores', async (req, res) => {
 
  try {
 
    const professores =
      await Professor.find();
 
    res.json(professores);
 
  } catch (error) {
 
    res.status(500).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.post('/professores', async (req, res) => {
 
  try {
 
    const professor =
      new Professor(req.body);
 
    await professor.save();
 
    res.status(201).json(professor);
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.put('/professores/:id', async (req, res) => {
 
  try {
 
    const professor =
      await Professor.findByIdAndUpdate(
 
        req.params.id,
        req.body,
        { new: true }
 
      );
 
    res.json(professor);
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.delete('/professores/:id', async (req, res) => {
 
  try {
 
    const professor =
      await Professor.findByIdAndDelete(
        req.params.id
      );
 
    if (!professor) {
 
      return res.status(404).json({
        error: 'Professor não encontrado'
      });
 
    }
 
    res.json({
      message:
        'Professor removido'
    });
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.get('/alunos', async (req, res) => {
 
  try {
 
    const alunos =
      await Aluno.find();
 
    res.json(alunos);
 
  } catch (error) {
 
    res.status(500).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.post('/alunos', async (req, res) => {
 
  try {
 
    const aluno =
      new Aluno(req.body);
 
    await aluno.save();
 
    res.status(201).json(aluno);
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.put('/alunos/:id', async (req, res) => {
 
  try {
 
    const aluno =
      await Aluno.findByIdAndUpdate(
 
        req.params.id,
        req.body,
        { new: true }
 
      );
 
    res.json(aluno);
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.delete('/alunos/:id', async (req, res) => {
 
  try {
 
    await Aluno.findByIdAndDelete(
      req.params.id
    );
 
    res.json({
      message:
        'Aluno removido'
    });
 
  } catch (error) {
 
    res.status(400).json({
      error: error.message
    });
 
  }
 
});
 
 
 
app.listen(4000, () => {
 
  console.log(
    'Servidor rodando na porta 4000'
  );
 
});