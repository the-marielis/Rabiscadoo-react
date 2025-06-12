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
import {converteData} from "../Utils/converteData.js";

const Perfil = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const { usuario, logout, buscarUsuario } = useAuth();
  const [editando, setEditando] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const inputFileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    avatar: "",
  });

  // Atualiza formData quando usuario for carregado
  useEffect(() => {

    if (usuario) {
      setFormData({
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        nascimento: converteData(usuario.nascimento)|| "",
        avatar: usuario.avatar || "",
      });
    }
  }, [usuario]);

  const showToast = (message, type = "error") => setToast({ message, type });
  const toggleEdicao = () => setEditando(!editando);



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
  };

  const deletarConta = () => {
    let confirmar = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmar) return;
    confirmar = window.confirm("Tem certeza MESMO?");
    confirmar = window.confirm("Tem certeza? Faz isso comigo não pufavo");

    axios
        .delete(`http://localhost:3301/api/usuario/deletar/${usuario?.idusuario}`)
        .then(() => {
          showToast("⚠️ USUÁRIO Deletado ⚠️", "success");
          setTimeout(() => {
            logout();
            navigate(`/login`);
          }, 2000);
        })
        .catch((error) => {
          console.error("Erro ao deletar conta:", error);
          showToast("Erro ao deletar conta", "error");
        });
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
  };

  const cancelarEdicao = () => {
    setEditando(false);
    setFormData({
      nome: usuario?.nome || "",
      email: usuario?.email || "",
      telefone: usuario?.telefone || "",
      nascimento: usuario?.nascimento || "",
      avatar: usuario?.avatar || "",
    });
  };

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
                          alt="Avatar"
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

                <div className="dados">
                  <div className="linha-nome">
                    {editando ? (
                        <div className="input-group">
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
                        <div className="input-group">
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
                              value={formData.nascimento}
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
                          Data de nascimento: {formData?.nascimento || "00/00/0000"}
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
                <GoGear />
              </div>
              <p>Alterar senha</p>
              <p>Mudar para perfil profissional</p>
              <p>Alterar preferências da conta</p>
              <p>Ocultar pessoas</p>
              <p className="delete" onClick={deletarConta}>
                <br />
                Deletar conta
              </p>
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
