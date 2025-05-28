import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/agenda.css";
import BotaoContinuar from "./BotaoContinuar";
import InputCustomizado from "./InputCustomizado";
import axios from "axios";

const Agenda = () => {
  const { idusuario  } = useParams(); // pega o id da URL
  const [profissional, setProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("");

  useEffect(() => {
    // Busca todos os profissionais para o select
    axios.get("http://localhost:3301/api/todos-profissionais").then((res) => {
      setProfissionais(res.data);
    });

    // Se veio um id na rota, busca o nome do profissional
    if (idusuario ) {
      axios
        .get(`http://localhost:3301/api/profissionais/${idusuario }`)
        .then((res) => {
          setProfissionalSelecionado(res.data.nome);
        })
        .catch((err) => {
          console.error("Erro ao buscar profissional:", err);
        });
    }
  }, [idusuario ]);
  return (
    <section className="secao-agenda">
      <div className="container-agenda">
        <h2>Fala mais do seu projeto pra nós</h2>
        <form className="form-agenda">
          <div className="linha1">
            <label>
              Profissional:
              <select
                value={profissionalSelecionado}
                onChange={(e) => setProfissionalSelecionado(e.target.value)}
              >
                <option value="">selecione</option>
                {profissional.map((prof) => (
                  <option key={prof.idusuario} value={prof.nome}>
                    {prof.nome}
                  </option>
                ))}
              </select>
              {/*<select>
                <option value="">selecione</option>
                <option value="">Fulana da Silva</option>    
                <option value="">Fulano Matos</option> 
                <option value="">Joaquina Pão</option>
                <option value="">José Zé</option>
                <option value="">Francisquinho</option>
              </select> */}
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
