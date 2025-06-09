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
  const { usuario } = useAuth();

  /* ----------------------------- estados gerais ----------------------------- */
  const [listaProfissionais, setListaProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");
  const [estilo, setEstilo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [localCorpo, setLocalCorpo] = useState("");
  const [comCor, setComCor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [toast, setToast]         = useState(null);

  /* --------------------------- helpers & utilidades -------------------------- */
  const showToast = (message, type = "error") => setToast({ message, type });

  const resetForm = () => {
    setProfissionalSelecionado("");
    setEstilo("");
    setTamanho("");
    setLocalCorpo("");
    setComCor("");
    setDescricao("");
    setArquivo(null);
    setNomeArquivo("");
  };

  /* ------------------------- carregando profissionais ------------------------ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3301/api/profissionais");
        setListaProfissionais(data);

        if (idusuario) {
          setProfissionalSelecionado(parseInt(idusuario));
          const { data: perfil } = await axios.get(
            `http://localhost:3301/api/profissionais/${idusuario}`
          );
          setEstilo(perfil.estilo.toLowerCase().trim());
        }
      } catch (err) {
        console.error("Erro ao buscar profissionais:", err);
        showToast("Erro ao carregar profissionais. Tente novamente.");
      }
    };
    fetchData();
  }, [idusuario]);

  /* --------------------------- tratador de arquivo --------------------------- */
  const handleArquivoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivo(file);
      setNomeArquivo(file.name);
    }
  };

  /* ---------------------------- submissao do form --------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validações básicas
    if (!usuario) {
      showToast("⚠️ Faça login para agendar um serviço.");
      setTimeout(() => navigate("/login"), 2000);
      return;
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

    // monta formData
    const nomeProfissional =
      listaProfissionais.find((p) => p.idusuario === parseInt(profissionalSelecionado))?.nome || "";

    const formData = new FormData();
    formData.append("profissional", nomeProfissional);
    formData.append("estilodatattoo", estilo);
    formData.append("tamanho", tamanho);
    formData.append("local_corpo", localCorpo);
    formData.append("comcor", comCor);
    formData.append("descricao", descricao);
    formData.append("idPerfil_tatuador", idusuario || profissionalSelecionado);
    formData.append("arquivo", arquivo);

    // envio
    try {
      let idServico = await axios.get()
      await axios.post("http://localhost:3301/api/servicos", formData).then((result) =>{

        idServico = result.data.idservico;
      }); // axios seta o Content‑Type automaticamente



      showToast("✅ Serviço enviado com sucesso!", "success");
      resetForm();
      console.log(idServico.toString())
      setTimeout(() => navigate(`/agendamento/${idServico}`), 1200);

    } catch (err) {
      console.error("Erro ao enviar serviço:", err);
      showToast("❌ Erro ao enviar. Tente novamente.");
    }
  };

  /* -------------------------------- componente ------------------------------- */
  return (
    <>
      {/* toast */}
      {toast && (
        <div className="toast-container">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <section className="secao-agenda">
        <div className="container-agenda">
          <h2>Fala mais do seu projeto pra nós</h2>
          <form className="form-agenda" onSubmit={handleSubmit}>
            {/* linha 1: profissional + estilo */}
            <div className="linha1">
              <label>
                Profissional:
                <div className="select-wrapper">
                  <select
                    value={profissionalSelecionado}
                    onChange={(e) => setProfissionalSelecionado(parseInt(e.target.value))}
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
                  {idusuario && <img src="/images/cadeado2.png" className="cadeado" />}
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

            {/* linha 2: tamanho / local / comCor */}
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
                <select value={comCor} onChange={(e) => setComCor(e.target.value)}>
                  <option value="">selecione</option>
                  <option value="sim">sim</option>
                  <option value="não">não</option>
                </select>
              </label>
            </div>

            {/* linha 3: descricao + imagem */}
            <div className="linha3">
              <label>
                Qual sua ideia para esse projeto?
                <div className="textarea-wrapper">
                  <textarea
                    value={descricao}
                    placeholder="Descreva sua ideia aqui..."
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                  <input type="file" onChange={handleArquivoChange} className="input-img" />
                </div>
                {nomeArquivo && (
                  <p style={{ color: "red", marginTop: 8 }}>{nomeArquivo}</p>
                )}
              </label>
            </div>

            <BotaoContinuar texto="confirmar" largura="35%" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Agenda;
