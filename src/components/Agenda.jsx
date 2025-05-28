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
  // Busca todos os profissionais para o select
  axios.get("http://localhost:3301/api/profissionais").then((res) => {
    setListaProfissionais(res.data);
  });

  // Busca o nome do profissional se tiver id na URL
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
  return (
    <section className="secao-agenda">
      <div className="container-agenda">
        <h2>Fala mais do seu projeto pra nós</h2>
        <form className="form-agenda">
          <div className="linha1">
            <label>
              Profissional:
              <div className="select-wrapper">
              <select
                value={profissionalSelecionado}
                onChange={(e) => setProfissionalSelecionado(e.target.value)}
                disabled={!!idusuario} // trava o select se tiver ID na URL
                className={idusuario ? "select-bloqueado" : ""}
              >
                <option value="">selecione</option>
                {listaProfissionais.map((prof) => (
                  <option key={prof.idusuario} value={prof.nome}>
                  {prof.nome}
                </option>
                ))}
              </select>
              { idusuario && <img src="/images/cadeado2.png" className="cadeado" /> }
              </div>
            </label>
            <label>
              Estilo da tattoo:
              <select>
                <option value="">selecione</option>
                <option value="">blackwork</option>
                <option value="">realista</option>
                <option value="">old school</option>
                <option value="">oriental</option>
                <option value="">geek</option>
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
                tamanho="100%"
              />
            </label>
            <label>
              Local do corpo:
              <InputCustomizado
                tipo="text"
                nome="localCorpo"
                placeholder="Local do corpo"
                tamanho="100%"
              />
            </label>
            <label>
              Tattoo colorida?
              <select>
                <option value="">selecione</option>
                <option value="">sim</option>
                <option value="">não</option>
              </select>
            </label>
          </div>
          <div className="linha3">
            <label>
              Qual sua ideia para esse projeto?
              <div className="textarea-wrapper">
                <textarea placeholder="Descreva sua ideia aqui..."></textarea>
                <input type="file" className="input-img" />
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
