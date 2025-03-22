const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware para analisar JSON
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'rabiscadoo', 
  decimalNumbers: true
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
  } else {
    console.log('Conectado ao MySQL!');
  }
});


// Rota de login
app.post('/api/login', (req, res) => {
  console.log("CHamou api");
  const { nome_usuario, senha } = req.body;
  const query = 'SELECT * FROM cadastrologin WHERE nome_usuario = ?';
  //console.log(nome_usuario, senha);
  db.query(query, [nome_usuario], async (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Erro no servidor' });
      console.log("MIAU");
    }

    if (results.length === 0) {
      return res.status(401).send({ error: 'Usuário não encontrado' });
      console.log("USUARIO NAO ENCONTRADO");
    }

    const user = results[0];
    console.log(user);

    if (senha == user.senha) {
      res.status(200).send({ message: 'Login bem-sucedido', user });
    } else {
      res.status(401).send({ error: 'Senha incorreta' });
    }
  });
});

// Inicializar o servidor
const port = 3301;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});