/* eslint-disable */

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware para analisar JSON
app.use(express.json());

//*************CONEXÃO COM O BANCO DE DADOS****************/
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


//********************ROTA DE LOGIN**********************/
app.post('/api/login', (req, res) => {
  const { nome_usuario, senha, tp_cadastro } = req.body;
  const query = 'SELECT * FROM cadastrologin WHERE nome_usuario = ?';
  console.log(nome_usuario, senha, tp_cadastro);
  db.query(query, [nome_usuario], async (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).send({ error: 'Usuário não encontrado' });
    }

    const user = results[0];
    console.log("Usuário encontrado:", user);

    if (senha == user.senha) {
      if (user.tp_cadastro === "rabiscadoo") {
        return res.status(200).send({ message: 'Login bem-sucedido', tp_cadastro: 'rabiscadoo', user });
      } else if (user.tp_cadastro === "tatuador") {
        return res.status(200).send({ message: 'Login bem-sucedido', tp_cadastro: 'tatuador', user });
      } else {
        return res.status(400).send({ error: 'Tipo de usuário desconhecido' });
      }
    } else {
      return res.status(401).send({ error: 'Senha incorreta' });
    }
  });
});

//*******************ROTA DE CADASTRO**********************/
app.post('/api/cadastro', (req, res) => {
  console.log(req.body);
  const { nome, nome_usuario, senha, CPF, RG, nascimento, telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro } = req.body;

  if (!nome || !nome_usuario || !senha || !CPF || !telefone || !email || !CEP || !cidade || !endereco) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const query = 'INSERT INTO cadastrologin (nome, nome_usuario, senha, CPF, RG, nascimento, telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, nome_usuario, senha, CPF, RG, nascimento, telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro], 
    (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).send({ error: 'Erro ao cadastrar usuário', details: err.message });    
    }

    res.status(201).send({ message: 'Usuário cadastrado com sucesso' });
  });
})

// Inicializar o servidor
const port = 3301;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});