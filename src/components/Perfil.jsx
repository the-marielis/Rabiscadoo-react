import React, { useState, useRef, useEffect } from "react";
import "../css/perfilUsuario.css";
import BotaoContinuar from "./BotaoContinuar";
import HistoricoList from "../components/HistoricoList/HistoricoList";
import { GoPencil, GoHistory, GoGear } from "react-icons/go";
import { VscInfo } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast/Toast.jsx";
import { converteDataBR, converteDataUsa} from "../Utils/converteData.js";
import {logout} from "../services/auth.js";
import BotaoDeletarConta from "./BotaoDeletarConta/BotaoDeletarConta.jsx";

const Perfil = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const { usuario, logout, buscarUsuario } = useAuth();
  const [editando, setEditando] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const inputFileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const deletouAvatar = useRef(false);


  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    avatar: "",
    senha:"",
    tp_cadastro: "",
    editouConfig: false,
  });


  // Atualiza formData quando usuario for carregado
  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        nascimento: converteDataUsa(usuario.nascimento) || "",
        avatar: usuario.avatar || "",
        senha: usuario.senha || "",
        tp_cadastro: usuario.tp_cadastro || "",
        editouConfig: false,
      });
    }
  }, [usuario]);

  const showToast = (message, type = "error") => setToast({ message, type });
  const toggleEdicao = () => setEditando(!editando);
  const toggleConfiguracao = () => setConfigurando(!configurando);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // <== Simula clique no input file
    }
  };

  const handleArquivoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivo(file);
      setNomeArquivo(file.name);
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
    nomeArquivo;
  };

  const SalvaAvatar = async () => {
    const form = new FormData();

    form.append("avatar", arquivo);
    form.append("idusuario", usuario?.idusuario);

    try {
      const response = await fetch("http://localhost:3301/api/avatar", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      console.log(data);
      await buscarUsuario(usuario?.idusuario); // Atualiza o contexto
      showToast("Avatar salvo com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao enviar avatar:", error);
      showToast("Erro ao salvar avatar", "error");
    }
  };

  const salvarEdicao = () => {

    if (usuario.senha != formData.senha || usuario.tp_cadastro != formData.tp_cadastro) {
      formData.editouConfig = true;
    }

    axios
        .put(`http://localhost:3301/api/usuario/atualizar/${usuario?.idusuario}`, formData)
        .then(() => {
          showToast("Dados atualizados com sucesso", "success");
          setEditando(false);
          buscarUsuario(usuario?.idusuario); // Atualiza os dados do usuário
        })
        .catch((error) => {
          console.error("Erro ao atualizar dados:", error);
          showToast("Erro ao atualizar dados", "error");
        });
    if(deletouAvatar.current){
      SalvaAvatar();
    }
    setEditando(false);
    setConfigurando(false);
  };

  const deletarAvatar = () => {
    deletouAvatar.current = true;
    setPreview('null');
    setArquivo('');
  }

  const cancelarEdicao = () => {
    setEditando(false);
    setFormData({
      nome: usuario?.nome || "",
      email: usuario?.email || "",
      telefone: usuario?.telefone || "",
      nascimento: converteDataUsa(usuario?.nascimento) || "",
      avatar: usuario?.avatar || "",
    });
    if(deletouAvatar){
      const url = `http://localhost:3301/${usuario?.avatar}`;
      setPreview(url);
    }
  };

  const cancelarEdicaoConfig = () => {    setConfigurando(false);  };

  return (
      <>
        {toast && (
            <div className="toast-container">
              <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            </div>
        )}

        <div
            className="perfil-container"
            style={{ backgroundImage: "url('/images/BACKGROUND_LOGIN.png')" }}
        >
          <section className="perfil-card">
            <h1 className="perfil-title">Sua conta</h1>

            <div className="perfil-grid">
              <article className="perfil-box info-principal">
                <div className="goPencil">
                  {!editando && (
                      <GoPencil
                          onClick={toggleEdicao}
                          style={{ cursor: "pointer", marginBottom: "1rem" }}
                      />
                  )}
                </div>
              <div  className={"avatar-container"}>
                <div
                    className="avatar"
                    onClick={handleIconClick}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                >
                  {preview || formData.avatar ? (
                      <img
                          src={
                              preview ||
                              (formData.avatar
                                  ? `http://localhost:3301/${formData.avatar}`
                                  : "/images/default-avatar.png")
                          }
                          alt=""
                          className="avatar-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                      />


                  ) : null}

                  <GoPencil className="avatar-pencil" />
                  <input
                      type="file"
                      ref={inputFileRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleArquivoChange}
                  />

                </div>

                {editando ? (

                    preview || formData.avatar ? (

                        <button className="botao-avatar" onClick={deletarAvatar}>
                          Deletar foto
                        </button>

                    ) : null
                ):null}
                </div>

                <div className="dados">
                  <div className="linha-nome">
                    {editando ? (
                        <div className="input-groupos">
                          <input
                              type="text"
                              name="nome"
                              value={formData.nome}
                              onChange={handleChange}
                          />
                        </div>
                    ) : (
                        <h2>{usuario?.nome || "Nome do Usuário"}</h2>
                    )}
                  </div>

                  {editando ? (
                      <>
                        <div className="input-groupos">
                          <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                          />
                          <input
                              type="text"
                              name="telefone"
                              value={formData.telefone}
                              onChange={handleChange}
                          />
                          <input
                              type="date"
                              name="nascimento"
                              value={formData.nascimento || ""}
                              onChange={handleChange}
                          />
                          <div className="botoes-edicao">
                            <button className="botao-salvar" onClick={salvarEdicao}>
                              Salvar
                            </button>
                            <button className="botao-cancelar" onClick={cancelarEdicao}>
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </>
                  ) : (
                      <>
                        <p>{usuario?.email || "email@email.com"}</p>
                        <p>Telefone: {usuario?.telefone || "Não informado"}</p>
                        <p>
                          Data de nascimento: {converteDataBR(formData?.nascimento) || "00/00/0000"}
                        </p>
                      </>
                  )}
                </div>
              </article>

              <article className="perfil-box historicos">
                <div className="linha-historicos">
                  <h3>Históricos</h3>
                  <GoHistory />
                </div>
                <HistoricoList />
              </article>

            <article className="perfil-box privacidade">
              <div className="linha-privacidade">
                <h3>Privacidade e Segurança</h3>
                <div className="goGear">

                  {!configurando && (
                      <GoGear
                          onClick={toggleConfiguracao}
                          style={{ cursor: "pointer", marginBottom: "1rem" }}
                      />
                  )}
                </div>
              </div>
              {configurando ? (
                  <>
                    <div className="input-groupos-config">
                    <input
                        type="text"
                        name="senha"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                    <select
                        type="text"
                        name="tp_cadastro"
                        value={formData.tp_cadastro}
                        onChange={handleChange}
                    >
                      {/*<option value="">Selecione o tipo</option>*/}
                      <option value="rabiscadoo">rabiscadoo</option>
                      <option value="tatuador">tatuador</option>
                    </select>
                    </div>

                  <div className="botoes-edicao">
                    <button className="botao-salvar" onClick={salvarEdicao}>
                      Salvar
                    </button>
                    <button className="botao-cancelar" onClick={cancelarEdicaoConfig}>
                      Cancelar
                    </button>
                  </div>

                  </>
                  ) : (
                  <>
              <p>Alterar senha</p>
              <p>Mudar para perfil profissional</p>
              <p>Alterar preferências da conta</p>
              <p>Ocultar pessoas</p>
                    <BotaoDeletarConta
                    idusuario={usuario?.idusuario}
                    idTatuador={usuario?.idTatuador}
                    showToast={showToast}
                    />
              </>
              )
              }
            </article>

              <article className="perfil-box preferencias">
                <div className="linha-preferencias">
                  <h3>Preferências</h3>
                  <VscInfo />
                </div>
                <p>Armazenamento</p>
                <p>Notificações</p>
                <p>Sobre a Rabiscadoo</p>
                <p>v.0.0.1/2024</p>
              </article>
              <br />
            </div>

            <BotaoContinuar texto="confirmar" onClick={SalvaAvatar} largura="35%" />
          </section>
        </div>
      </>
  );
};

export default Perfil;
