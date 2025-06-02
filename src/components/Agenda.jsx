import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/agenda.css";
import BotaoContinuar from "./BotaoContinuar";
import InputCustomizado from "./InputCustomizado";
import axios from "axios";
import Toast from "./Toast/Toast.jsx";
import { useAuth } from "../context/AuthContext";

const Agenda = () => {
  const navigate = useNavigate();
  const { idusuario } = useParams();
  const [listaProfissionais, setListaProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");
  const [estilo, setEstilo] = useState("");
  const [toast, setToast] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:3301/api/profissionais").then((res) => {
      setListaProfissionais(res.data);

      if (idusuario) {
        setProfissionalSelecionado(parseInt(idusuario));

        axios
          .get(`http://localhost:3301/api/profissionais/${idusuario}`)
          .then((res) => {
            const estiloFormatado = res.data.estilo.toLowerCase().trim();
            setEstilo(estiloFormatado);
          })
          .catch((err) => {
            console.error("Erro ao buscar perfil profissional:", err);
          });
      }
    });
  }, [usuario, idusuario]);

  const [tamanho, setTamanho] = useState("");
  const [localCorpo, setLocalCorpo] = useState("");
  const [comCor, setComCor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");

  const showToast = (message, type = "error") => {
    setToast({ message, type });
  };

  const handleArquivoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setArquivo(file);
      setNomeArquivo(file.name);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log(">>> handleSubmit foi chamado!");

    if (!usuario) {
      showToast("⚠️ Faça login para agendar um serviço.");

      setTimeout(() => {
        navigate("/login");
      }, 2500);

      return; // interrompe o envio do formulário
    }

    if (
      !profissionalSelecionado ||
      !estilo ||
      !tamanho ||
      !localCorpo ||
      !comCor ||
      !descricao
    ) {
      showToast("⚠️ Preencha todos os campos obrigatórios.");
      return;
    }

    if (!arquivo) {
      showToast("⚠️ Envie uma imagem de referência.");
      return;
    }

    const nomeProfissional =
      listaProfissionais.find(
        (p) => p.idusuario === parseInt(profissionalSelecionado)
      )?.nome || "";

    const formData = new FormData();
    formData.append("profissional", nomeProfissional);
    formData.append("estilodatattoo", estilo);
    formData.append("tamanho", tamanho);
    formData.append("local_corpo", localCorpo);
    formData.append("comcor", comCor);
    formData.append("descricao", descricao);
    formData.append("idPerfil_tatuador", idusuario || profissionalSelecionado);
    formData.append("arquivo", arquivo);

    axios
      .post("http://localhost:3301/api/servicos", formData)
      .then(() => {
        alert("Serviço enviado com sucesso!");

        // limpar campos
        setProfissionalSelecionado("");
        setEstilo("");
        setTamanho("");
        setLocalCorpo("");
        setComCor("");
        setDescricao("");
        setArquivo(null);

        // redirecionar
        navigate("/agendamento");
      })
      .catch((err) => {
        console.error("Erro ao enviar serviço:", err);
        setToast("❌ Erro ao enviar. Tente novamente.");
      });
  };

  return (
    <>
      <div className="toast-container">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>

      <section className="secao-agenda">
        <div className="container-agenda">
          <h2>Fala mais do seu projeto pra nós</h2>
          <form className="form-agenda" onSubmit={handleSubmit}>
            <div className="linha1">
              <label>
                Profissional:
                <div className="select-wrapper">
                  <select
                    value={profissionalSelecionado}
                    onChange={(e) =>
                      setProfissionalSelecionado(parseInt(e.target.value))
                    }
                    disabled={!!idusuario}
                    className={idusuario ? "select-bloqueado" : ""}
                  >
                    <option value="">selecione</option>
                    {listaProfissionais.map((prof) => (
                      <option key={prof.idusuario} value={prof.idusuario}>
                        {prof.nome}
                      </option>
                    ))}
                  </select>
                  {idusuario && (
                    <img src="/images/cadeado2.png" className="cadeado" />
                  )}
                </div>
              </label>
              <label>
                Estilo da tattoo:
                <select
                  value={estilo}
                  onChange={(e) => setEstilo(e.target.value)}
                  disabled={!!idusuario}
                >
                  <option value="">selecione</option>
                  <option value="blackwork">blackwork</option>
                  <option value="realista">realista</option>
                  <option value="oldschool">old school</option>
                  <option value="oriental">oriental</option>
                  <option value="anime/geek">anime/geek</option>
                </select>
              </label>
            </div>
            <br />
            <div className="linha2">
              <label>
                Tamanho:
                <InputCustomizado
                  tipo="text"
                  nome="tamanho"
                  placeholder="cm"
                  valor={tamanho}
                  aoMudar={(e) => setTamanho(e.target.value)}
                  tamanho="100%"
                />
              </label>
              <label>
                Local do corpo:
                <InputCustomizado
                  tipo="text"
                  nome="localCorpo"
                  placeholder="Local do corpo"
                  value={localCorpo}
                  aoMudar={(e) => setLocalCorpo(e.target.value)}
                  tamanho="100%"
                />
              </label>
              <label>
                Tattoo colorida?
                <select
                  value={comCor}
                  onChange={(e) => setComCor(e.target.value)}
                >
                  <option value="">selecione</option>
                  <option value="sim">sim</option>
                  <option value="não">não</option>
                </select>
              </label>
            </div>
            <div className="linha3">
              <label>
                Qual sua ideia para esse projeto?
                <div className="textarea-wrapper">
                  <textarea
                    value={descricao}
                    placeholder="Descreva sua ideia aqui..."
                    onChange={(e) => setDescricao(e.target.value)}
                  >
                    {" "}
                  </textarea>
                  <input
                    type="file"
                    //onChange={(e) => setArquivo(e.target.files[0])}
                    onChange={handleArquivoChange}
                    className="input-img"
                  />
                </div>
                {nomeArquivo && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    {nomeArquivo}
                  </p>
                )}
              </label>
            </div>
            <br />
            <br />
            <br />
            <BotaoContinuar texto="confirmar" largura="35%" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Agenda;
