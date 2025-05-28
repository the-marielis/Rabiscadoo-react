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

//********************RODANDO O SERVIDOR*********************/
const port = 3301;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
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

  // Verifica se nome de usuário já existe
  db.query('SELECT * FROM cadastrologin WHERE nome_usuario = ?', [nome_usuario], (err, userResults) => {
    if (err) {
      console.error('Erro ao verificar nome de usuário:', err);
      return res.status(500).send({ error: 'Erro ao verificar nome de usuário' });
    }

    if (userResults.length > 0) {
      return res.status(409).send({ error: 'Nome de usuário já está em uso' });
    }

    // Verifica se e-mail já existe
    db.query('SELECT * FROM cadastrologin WHERE email = ?', [email], (err, emailResults) => {
      if (err) {
        console.error('Erro ao verificar e-mail:', err);
        return res.status(500).send({ error: 'Erro ao verificar e-mail' });
      }

      if (emailResults.length > 0) {
        return res.status(409).send({ error: 'E-mail já está em uso' });
      }

      // Verifica se CPF já existe
      db.query('SELECT * FROM cadastrologin WHERE CPF = ?', [CPF], (err, cpfResults) => {
        if (err) {
          console.error('Erro ao verificar CPF:', err);
          return res.status(500).send({ error: 'Erro ao verificar CPF' });
        }

        if (cpfResults.length > 0) {
          return res.status(409).send({ error: 'CPF já está cadastrado' });
        }

        // Depois de validar, pode inserir
        const insertQuery = `
          INSERT INTO cadastrologin 
          (nome, nome_usuario, senha, CPF, RG, nascimento, telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(insertQuery, [nome, nome_usuario, senha, CPF, RG, nascimento, telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro], 
          (err, results) => {
            if (err) {
              console.error('Erro ao cadastrar usuário:', err);
              return res.status(500).send({ error: 'Erro ao cadastrar usuário', details: err.message });
            }

            res.status(201).send({ message: 'Usuário cadastrado com sucesso' });
          }
        );
      });
    });
  });
});

//*******************ATUALIZAR CADASTRO**********************/
app.put('/api/cadastro/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario;
  const {
    nome, nome_usuario, senha, CPF, RG, nascimento,
    telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro
  } = req.body;

  if (!nome || !nome_usuario || !senha || !CPF || !telefone || !email || !CEP || !cidade || !endereco) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const updateQuery = `
    UPDATE cadastrologin SET 
      nome = ?, nome_usuario = ?, senha = ?, CPF = ?, RG = ?, nascimento = ?, 
      telefone = ?, telefone2 = ?, email = ?, CEP = ?, cidade = ?, endereco = ?, tp_cadastro = ?
    WHERE idusuario = ?
  `;

  db.query(updateQuery, [
    nome, nome_usuario, senha, CPF, RG, nascimento,
    telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro, idusuario
  ], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).send({ error: 'Erro ao atualizar usuário' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    res.status(200).send({ message: 'Usuário atualizado com sucesso' });
  });
});

//*******************EXCLUIR CADASTRO**********************/
app.delete('/api/cadastro/:idusuario', (req, res) => {
  const idusuario = req.params.idusuario;

  const deleteQuery = 'DELETE FROM cadastrologin WHERE idusuario = ?';

  db.query(deleteQuery, [idusuario], (err, result) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      return res.status(500).send({ error: 'Erro ao excluir usuário' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    res.status(200).send({ message: 'Usuário excluído com sucesso' });
  });
});
//*******************ROTA PARA PERFIL + PORTFÓLIO**********************/
app.get("/api/profissionais/:idusuario", (req, res) => {
  const idusuario = req.params.idusuario;
  console.log("ID recebido na rota:", idusuario);

  const queryPerfilCompleto = `
    SELECT 
      c.nome,
      c.cidade,
      c.nascimento,
      TIMESTAMPDIFF(YEAR, c.nascimento, CURDATE()) AS idade,
      c.telefone,
      p.id as idtatuador,
      p.estilo,
      p.descricao,
      p.imagem,
      p.instagram,
      p.portifolio_url
    FROM cadastrologin c
    JOIN perfil_tatuador p 
    ON c.idusuario = p.idusuario
    WHERE c.idusuario = ?
  `;

  db.query(queryPerfilCompleto, [idusuario], (err, result) => {
    if (err) {
      console.error("Erro na consulta do perfil:", err);
      return res.status(500).json({ error: "Erro ao buscar perfil" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Profissional não encontrado" });
    }

    const perfil = result[0];
    const idtatuador = perfil.idtatuador;

    const queryPortfolio = `
      SELECT id, descricao, imagem FROM portfolio WHERE idtatuador = ?
    `;

    db.query(queryPortfolio, [idtatuador], (err2, resultadoPortfolio) => {
  if (err2) {
    console.error("Erro ao buscar portfólio:", err2);
    return res.status(500).json({ erro: "Erro ao buscar portfólio" });
  }

  // Converter o BLOB para base64
  const portfolioConvertido = resultadoPortfolio.map((item) => {
    return {
      ...item,
      imagem: item.imagem ? `data:image/jpeg;base64,${item.imagem.toString('base64')}` : null
    };
  });

  perfil.portfolio = portfolioConvertido;
  res.json(perfil);
});
});
});

//*******************ROTA PARA TODOS OS PERFIS**********************/
app.get("/api/profissionais", (req, res) => {
  const query = `
    SELECT c.idusuario, c.nome
    FROM cadastrologin c
    JOIN perfil_tatuador p ON c.idusuario = p.idusuario
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar profissionais:", err);
      return res.status(500).json({ error: "Erro ao buscar profissionais" });
    }
    res.json(results);
  });
});
