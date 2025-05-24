import React, { useState } from "react";
import axios from "axios";
import "../css/cadastro.css";
import { Link, useNavigate } from "react-router-dom";
import BotaoContinuar from "./BotaoContinuar";
import InputCustomizado from "./InputCustomizado";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    nascimento: "",
    CPF: "",
    RG: "",
    cidade: "",
    CEP: "",
    endereco: "",
    telefone: "",
    telefone2: "",
    email: "",
    nome_usuario: "",
    senha: "",
    tp_cadastro: "",
  });

  const [mensagemErro, setMensagemErro] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro("");

    try {
      const response = await axios.post(
        "http://localhost:3301/api/cadastro",
        formData
      );
      console.log(response.data);
      alert("Cadastro realizado com sucesso!");
      return Navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setMensagemErro(error.response.data.error);
      } else {
        setMensagemErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-image">
        <img src="/images/mancha2.png" alt="mancha" id="img-direita" />
      </div>
      <div className="form-image2">
        <img src="/images/mancha3.png" alt="mancha" id="img-esquerda" />
      </div>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="title">
                <h1>Cadastre-se já</h1>
              </div>
              <div className="login-button">
                <button style={{ marginRight: "50px" }}>
                  <Link to="/login"> Entrar</Link>
                </button>
              </div>
            </div>

            {/* INPUTS */}
            <div className="input-group">
              <InputCustomizado
                tipo="text"
                nome="nome"
                placeholder="Nome completo"
                valor={formData.nome}
                aoMudar={handleChange}
                obrigatorio={true}
                tamanho="100%"
              />
              <div className="line2">
                <InputCustomizado
                  tipo="date"
                  nome="nascimento"
                  placeholder="Data de Nascimento"
                  valor={formData.nascimento}
                  aoMudar={handleChange}
                  // aoInput={handleInput}
                  obrigatorio={true}
                  tamanho="33%"
                />
                <InputCustomizado
                  tipo="text"
                  nome="CPF"
                  placeholder="CPF"
                  valor={formData.CPF}
                  aoMudar={handleChange}
                  aoInput={handleInput}
                  obrigatorio={true}
                  maxLength={11}
                  tamanho="33%"
                />
                <InputCustomizado
                  tipo="text"
                  nome="RG"
                  placeholder="RG"
                  valor={formData.RG}
                  aoMudar={handleChange}
                  aoInput={handleInput}
                  obrigatorio={true}
                  maxLength={11}
                  tamanho="33%"
                />
              </div>
              <div className="line3">
                <InputCustomizado
                  tipo="text"
                  nome="cidade"
                  placeholder="Qual sua cidade?"
                  valor={formData.cidade}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="100%"
                />
              </div>

              <div className="line4">
                <InputCustomizado
                  tipo="text"
                  nome="CEP"
                  placeholder="CEP"
                  valor={formData.CEP}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
                <InputCustomizado
                  tipo="text"
                  nome="endereco"
                  placeholder="Endereço completo"
                  valor={formData.endereco}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
              </div>
              <div className="line5">
                <InputCustomizado
                  tipo="tel"
                  nome="telefone"
                  placeholder="Telefone principal"
                  valor={formData.telefone}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
                <InputCustomizado
                  tipo="tel"
                  nome="telefone2"
                  placeholder="Telefone para recado"
                  valor={formData.telefone2}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
              </div>
              <div className="line6">
                <InputCustomizado
                  tipo="email"
                  nome="email"
                  placeholder="Digite seu e-mail"
                  valor={formData.email}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
                <InputCustomizado
                  tipo="text"
                  nome="nome_usuario"
                  placeholder="Digite o nome de usuário"
                  valor={formData.nome_usuario}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
              </div>
              <div className="line7">
                <InputCustomizado
                  tipo="password"
                  nome="senha"
                  placeholder="Digite sua senha"
                  valor={formData.senha}
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
                <InputCustomizado
                  tipo="password"
                  nome="confirme-senha"
                  placeholder="Confirme sua senha"
                  
                  aoMudar={handleChange}
                  obrigatorio={true}
                  tamanho="50%"
                />
           
              </div>
              <div className="tp-cadastro">
                <div className="tipo">
                  <label htmlFor="tp_cadastro">
                    <b>Você é:</b>
                  </label>
                </div>
                <div className="option">
                  <input
                    type="radio"
                    id="tp-rabiscadoo"
                    name="tp_cadastro"
                    value="rabiscadoo"
                    onChange={handleChange}
                  />{" "}
                  <label htmlFor="tp-rabiscadoo">Rabiscadoo</label>
                  <br />
                  <input
                    type="radio"
                    id="tp-tatu"
                    name="tp_cadastro"
                    value="tatuador"
                    onChange={handleChange}
                  />{" "}
                  <label htmlFor="tp-tatu">Tatuador</label>
                </div>
              </div>

              <BotaoContinuar mensagemErro={mensagemErro} texto="bora lá!" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
