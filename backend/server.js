const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

// Configurações de CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua com seu usuário do MySQL
  password: '', // Substitua com sua senha do MySQL
  database: 'rabiscadoo', // Substitua com seu banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rota de login
app.post('api/cadastrologin', (req, res) => {
  const { nome_usuario, password } = req.body;

  db.query('SELECT * FROM cadastrologin WHERE nome_usuario = ?', [nome_usuario], (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err.message);
      return res.status(500).send('Erro no servidor');
    }

    if (results.length === 0) {
      return res.status(400).send('Usuário não encontrado');
    }

    const user = results[0];

    // Comparar a senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar senhas:', err.message);
        return res.status(500).send('Erro no servidor');
      }

      if (!isMatch) {
        return res.status(400).send('Senha incorreta');
      }

      // Gerar um token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, 'seu-segredo', {
        expiresIn: '1h', // O token expira em 1 hora
      });

      return res.json({ message: 'Login bem-sucedido', token });
    });
  });
});

// Inicializar o servidor
const port = 3306;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
