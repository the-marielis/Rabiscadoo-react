/* eslint-disable */

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware para analisar JSON
app.use(express.json());

// Define onde salvar os arquivos e com que nome
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + path.extname(file.originalname);
    cb(null, nomeArquivo);
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

//*************CONEXÃO COM O BANCO DE DADOS****************/
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rabiscadoo",
  decimalNumbers: true,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err.message);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

//********************RODANDO O SERVIDOR*********************/
const port = 3301;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//********************ROTA DE LOGIN**********************/
app.post("/api/login", (req, res) => {
  const { nome_usuario, senha, tp_cadastro } = req.body;
  const query = "SELECT * FROM cadastrologin WHERE nome_usuario = ?";
  console.log(nome_usuario, senha, tp_cadastro);
  db.query(query, [nome_usuario], async (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Erro no servidor" });
    }

    if (results.length === 0) {
      return res.status(401).send({ error: "Usuário não encontrado" });
    }

    const user = results[0];
    console.log("Usuário encontrado:", user);

    if (senha == user.senha) {
      if (user.tp_cadastro === "rabiscadoo") {
        return res.status(200).send({
          message: "Login bem-sucedido",
          tp_cadastro: "rabiscadoo",
          user,
        });
      } else if (user.tp_cadastro === "tatuador") {
        return res.status(200).send({
          message: "Login bem-sucedido",
          tp_cadastro: "tatuador",
          user,
        });
      } else {
        return res.status(400).send({ error: "Tipo de usuário desconhecido" });
      }
    } else {
      return res.status(401).send({ error: "Senha incorreta" });
    }
  });
});

//*************ROTA PARA RETORNAR DADOS DE LOGIN************/
app.get("/api/usuario/:idusuario", (req, res) => {
  const id = req.params.idusuario;
  console.log("Requisição recebida para o ID:", id);

  const query = "SELECT * FROM cadastrologin WHERE idusuario = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro no servidor:", err);
      return res.status(500).send({ error: "Erro no servidor" });
    }

    if (results.length === 0) {
      console.warn("Usuário não encontrado para o ID:", id);
      return res.status(404).send({ error: "Usuário não encontrado" });
    }

    console.log("Usuário retornado com sucesso:", results[0]);
    res.status(200).send(results[0]);
  });
});

//*******************ROTA DE CADASTRO**********************/
app.post("/api/cadastro", (req, res) => {
  console.log(req.body);
  const {
    nome,
    nome_usuario,
    senha,
    CPF,
    RG,
    nascimento,
    telefone,
    telefone2,
    email,
    CEP,
    cidade,
    endereco,
    tp_cadastro,
  } = req.body;

  if (
    !nome ||
    !nome_usuario ||
    !senha ||
    !CPF ||
    !telefone ||
    !email ||
    !CEP ||
    !cidade ||
    !endereco
  ) {
    return res
      .status(400)
      .send({ error: "Todos os campos obrigatórios devem ser preenchidos" });
  }

  // Verifica se nome de usuário já existe
  db.query(
    "SELECT * FROM cadastrologin WHERE nome_usuario = ?",
    [nome_usuario],
    (err, userResults) => {
      if (err) {
        console.error("Erro ao verificar nome de usuário:", err);
        return res
          .status(500)
          .send({ error: "Erro ao verificar nome de usuário" });
      }

      if (userResults.length > 0) {
        return res
          .status(409)
          .send({ error: "Nome de usuário já está em uso" });
      }

      // Verifica se e-mail já existe
      db.query(
        "SELECT * FROM cadastrologin WHERE email = ?",
        [email],
        (err, emailResults) => {
          if (err) {
            console.error("Erro ao verificar e-mail:", err);
            return res.status(500).send({ error: "Erro ao verificar e-mail" });
          }

          if (emailResults.length > 0) {
            return res.status(409).send({ error: "E-mail já está em uso" });
          }

          // Verifica se CPF já existe
          db.query(
            "SELECT * FROM cadastrologin WHERE CPF = ?",
            [CPF],
            (err, cpfResults) => {
              if (err) {
                console.error("Erro ao verificar CPF:", err);
                return res.status(500).send({ error: "Erro ao verificar CPF" });
              }

              if (cpfResults.length > 0) {
                return res
                  .status(409)
                  .send({ error: "CPF já está cadastrado" });
              }

              // Depois de validar, pode inserir
              const insertQuery = `
          INSERT INTO cadastrologin 
          (nome, nome_usuario, senha, CPF, RG, nascimento, telefone, telefone2, email, CEP, cidade, endereco, tp_cadastro) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
              db.query(
                insertQuery,
                [
                  nome,
                  nome_usuario,
                  senha,
                  CPF,
                  RG,
                  nascimento,
                  telefone,
                  telefone2,
                  email,
                  CEP,
                  cidade,
                  endereco,
                  tp_cadastro,
                ],
                (err, results) => {
                  if (err) {
                    console.error("Erro ao cadastrar usuário:", err);
                    return res.status(500).send({
                      error: "Erro ao cadastrar usuário",
                      details: err.message,
                    });
                  }

                  res
                    .status(201)
                    .send({ message: "Usuário cadastrado com sucesso" });
                }
              );
            }
          );
        }
      );
    }
  );
});

//*******************ATUALIZAR CADASTRO**********************/
app.put("/api/cadastro/:idusuario", (req, res) => {
  const idusuario = req.params.idusuario;
  const {
    nome,
    nome_usuario,
    senha,
    CPF,
    RG,
    nascimento,
    telefone,
    telefone2,
    email,
    CEP,
    cidade,
    endereco,
    tp_cadastro,
  } = req.body;

  if (
    !nome ||
    !nome_usuario ||
    !senha ||
    !CPF ||
    !telefone ||
    !email ||
    !CEP ||
    !cidade ||
    !endereco
  ) {
    return res
      .status(400)
      .send({ error: "Todos os campos obrigatórios devem ser preenchidos" });
  }

  const updateQuery = `
    UPDATE cadastrologin SET 
      nome = ?, nome_usuario = ?, senha = ?, CPF = ?, RG = ?, nascimento = ?, 
      telefone = ?, telefone2 = ?, email = ?, CEP = ?, cidade = ?, endereco = ?, tp_cadastro = ?
    WHERE idusuario = ?
  `;

  db.query(
    updateQuery,
    [
      nome,
      nome_usuario,
      senha,
      CPF,
      RG,
      nascimento,
      telefone,
      telefone2,
      email,
      CEP,
      cidade,
      endereco,
      tp_cadastro,
      idusuario,
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).send({ error: "Erro ao atualizar usuário" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }

      res.status(200).send({ message: "Usuário atualizado com sucesso" });
    }
  );
});

//*******************EXCLUIR CADASTRO**********************/
app.delete("/api/cadastro/:idusuario", (req, res) => {
  const idusuario = req.params.idusuario;

  const deleteQuery = "DELETE FROM cadastrologin WHERE idusuario = ?";

  db.query(deleteQuery, [idusuario], (err, result) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      return res.status(500).send({ error: "Erro ao excluir usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }

    res.status(200).send({ message: "Usuário excluído com sucesso" });
  });
});
//*******************ROTA PARA PERFIL + PORTFÓLIO**********************/
app.get("/api/profissionais/:idusuario", (req, res) => {
  const idusuario = req.params.idusuario;

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
          imagem: item.imagem
            ? `data:image/jpeg;base64,${item.imagem.toString("base64")}`
            : null,
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
//********************ROTA PARA AGENDA**************************/
app.use(
  cors({
    origin: "http://localhost:5173", // a porta em que teu Vite/React roda
  })
);

app.post("/api/servicos", upload.single("arquivo"), (req, res) => {
  console.log("chegou no upload");

  const {
    profissional,
    tamanho,
    local_corpo,
    comcor,
    descricao,
    idPerfil_tatuador,
  } = req.body;

  const arquivo = req.file?.filename;

  if (!arquivo) {
    return res.status(400).json({ erro: "Arquivo não foi enviado!" });
  }

  const buscarEstiloQuery = "SELECT estilo FROM perfil_tatuador WHERE id = ?";

  db.query(buscarEstiloQuery, [idPerfil_tatuador], (err, result) => {
    if (err) {
      console.error("Erro ao buscar estilo:", err);
      return res.status(500).json({ erro: "Erro ao buscar estilo" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ erro: "Estilo do tatuador não encontrado" });
    }

    const estilodatattoo = result[0].estilo;

    const sql = `INSERT INTO servico 
    (profissional, estilodatattoo, tamanho, local_corpo, comcor, descricao, idPerfil_tatuador, arquivo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      profissional,
      estilodatattoo,
      tamanho,
      local_corpo,
      comcor,
      descricao,
      idPerfil_tatuador,
      arquivo,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir serviço:", err);
        return res.status(500).json({ erro: "Erro ao inserir serviço" });
      }
      res.json({
        mensagem: "Serviço salvo com sucesso",
        idservico: result.insertId,
      });
      console.log("RESULTADOID")
      console.log(result.insertId);
    });
  });
});

app.get("/api/servicos", (req, res) => {
  const query = "SELECT * FROM servico";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar serviços:", err);
      return res.status(500).json({ erro: "Erro ao buscar serviços" });
    }

    res.status(200).json(results);
  });
});

//********************ROTA PARA AGENDAMENTO**************************/
app.get("/api/fechar-orcamento/:idagendamento", (req, res) => {
  const { idagendamento } = req.params;

  const sql = `
  SELECT 
      a.idagendamento,
      DATE_FORMAT(a.dataagendamento, '%d/%m/%Y') as dataagendamento,
      DATE_FORMAT(a.horaagendamento , '%H:%i') as horaagendamento,
      s.valororcado,
      s.descricao AS servico,
      tatuador.nome AS profissional,
      usuario.nome AS cliente
    FROM agendamento a
    JOIN servico s ON a.idservico = s.idservico
    JOIN perfil_tatuador p ON s.idPerfil_tatuador = p.id
    JOIN cadastrologin usuario ON a.idusuario = usuario.idusuario
    join cadastrologin tatuador on tatuador.idusuario = p.idusuario
    WHERE a.idagendamento = ?;
  `;

  db.query(sql, [idagendamento], (err, results) => {
    if (err) {
      console.error("Erro ao buscar agendamento:", err);
      return res.status(500).json({ erro: "Erro ao buscar agendamento." });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: "Agendamento não encontrado." });
    }

    res.json(results[0]);
  });
});
//********************ROTA PARA DELETAR AGENDAMENTO**************************/
app.delete("/api/fechar-orcamento/deletar/:idagendamento", (req, res) => {
  const { idagendamento } = req.params;

  const sql = `CALL deletaOrcamento(?);`;

  db.query(sql, [idagendamento], (err, results) => {
    if (err) {
      console.error("Erro ao Deletar Agendamento e Serviço:", err);
      return res.status(500).json({ erro: "Erro ao Deletar Agendamento e Serviço." });
    }

    res.json({ sucesso: true });
  });
});

//********************ROTA PARA VER HORÁRIOS OCUPADOS**************************/
app.get("/api/horarios-ocupados/:idprofissional", (req, res) => {
  const idprofissional = req.params.idprofissional;
  const sql = `
    SELECT
      cast(a.dataagendamento as char) as dataagendamento,
      DATE_FORMAT(a.horaagendamento , '%H:%i') as horaagendamento
    FROM agendamento a
    JOIN servico s ON a.idservico = s.idservico
    WHERE s.idPerfil_tatuador = ?
  `;

  db.query(sql, [idprofissional], (err, results) => {
    if (err) {
      console.error("Erro ao buscar horários ocupados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(results); // retorna [{dataagendamento: "2025-06-03", horaagendamento: "14:00"}, ...]
  });
});
//********************Pega o Tatuador apartir do servico **************************/
app.get("/api/servico-Tatuador/:idservico", (req, res) => {
  const idServico = req.params.idservico;
  const sql = `
    SELECT
      s.idPerfil_tatuador
    FROM  servico s 
    WHERE s.idservico = ?
  `;

  db.query(sql, [idServico], (err, results) => {
    if (err) {
      console.error("Erro ao buscar tatuador:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    // Retorna só o objeto, não um array
    res.json(results[0]);
  });
});


//**********************************Salva o Agendamento*************************************************//


app.post('/api/salvarAgendamento', (req, res) => {
  const {
    idagendamento = null,
    dataagendamento,
    horaagendamento,
    idservico,
    idusuario
  } = req.body;

  if (
      !dataagendamento, !horaagendamento, !idservico, !idusuario
  ) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

    // Inserção do novo agendamento
    const inserirAgendamentoQuery = `
      INSERT INTO agendamento 
          (idagendamento, idusuario, idservico, dataagendamento, horaagendamento)
      VALUES (?,?,?,?,?)
    `;

    db.query(
        inserirAgendamentoQuery,
        [idagendamento, idusuario, idservico, dataagendamento, horaagendamento],
        (err, result) => {
          if (err) {
            console.error("Erro ao salvar agendamento:", err);
            return res.status(500).json({ erro: "Erro um" });
          }

          return res.status(201).json({ mensagem: "Agendamento realizado com sucesso" });
        }
    );
  });

//***************************/  Pega Id do agendamento/***************************//

app.post("/api/pegaIdAgendamento", (req, res) => {
  const {
    idservico,
    idusuario,
    dataagendamento,
    horaagendamento
  } = req.body;
  console.log("entrou api")
  console.log(idservico,
      idusuario,
      dataagendamento,
      horaagendamento)

  const sql = `
    SELECT idagendamento FROM agendamento a
    WHERE a.idservico = ?
      AND a.idusuario = ?
      AND a.dataagendamento = ?
      AND a.horaagendamento = ?
  `;

  db.query(sql, [idservico, idusuario, dataagendamento, horaagendamento], (err, results) => {
    if (err) {
      console.error("Erro ao buscar ID do po:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(results[0]);


    console.log(results[0]);

  });
});