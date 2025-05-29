import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/agenda.css";
import BotaoContinuar from "./BotaoContinuar";
import InputCustomizado from "./InputCustomizado";
import axios from "axios";

const Agenda = () => {
  const { idusuario } = useParams();
  const [listaProfissionais, setListaProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3301/api/profissionais").then((res) => {
      setListaProfissionais(res.data);
    });

    if (idusuario) {
      axios
        .get(`http://localhost:3301/api/profissionais/${idusuario}`)
        .then((res) => {
          setProfissionalSelecionado(res.data.nome);
        })
        .catch((err) => {
          console.error("Erro ao buscar profissional:", err);
        });
    }
  }, [idusuario]);

  const [estilo, setEstilo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [localCorpo, setLocalCorpo] = useState("");
  const [comCor, setComCor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log(">>> handleSubmit foi chamado!");

    const formData = new FormData();
    formData.append("profissional", profissionalSelecionado);
    formData.append("estilodatattoo", estilo);
    formData.append("tamanho", tamanho);
    formData.append("local_corpo", localCorpo);
    formData.append("comcor", comCor);
    formData.append("descricao", descricao);
    formData.append("idPerfil_tatuador", idusuario || "");
    formData.append('arquivo', arquivo);

    axios
      .post("http://localhost:3301/api/servicos", formData)
      .then(() => {
        alert("Serviço enviado com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao enviar serviço:", err);
      });
  };

  return (
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
                  onChange={(e) => setProfissionalSelecionado(e.target.value)}
                  disabled={!!idusuario}
                  className={idusuario ? "select-bloqueado" : ""}
                >
                  <option value="">selecione</option>
                  {listaProfissionais.map((prof) => (
                    <option key={prof.idusuario} value={prof.nome}>
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
              >
                <option value="">selecione</option>
                <option value="blackwork">blackwork</option>
                <option value="realista">realista</option>
                <option value="old school">old school</option>
                <option value="oriental">oriental</option>
                <option value="geek">geek</option>
              </select>
            </label>
          </div>
          <br />
          <div className="linha2">
            <label>
              Tamanho:
              <InputCustomizado
                onChange={(e) => setTamanho(e.target.value)}
                value={tamanho}
                tipo="text"
                nome="tamanho"
                placeholder="cm"
                tamanho="100%"
              />
            </label>
            <label>
              Local do corpo:
              <InputCustomizado
                onChange={(e) => setLocalCorpo(e.target.value)}
                value={localCorpo}
                tipo="text"
                nome="localCorpo"
                placeholder="Local do corpo"
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
                  onChange={(e) => setDescricao(e.target.value)}
                  value={descricao}
                  placeholder="Descreva sua ideia aqui..."
                ></textarea>
                <input
                  type="file"
                  onChange={(e) => setArquivo(e.target.files[0])}
                  className="input-img"
                />
              </div>
            </label>
          </div>
          <br />
          <br />
          <br />
          <BotaoContinuar texto="confirmar" largura="35%" />
        </form>
      </div>
    </section>
  );
};

export default Agenda;
