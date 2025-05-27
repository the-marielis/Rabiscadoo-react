import React from "react";
import "../css/agenda.css";
import BotaoContinuar from "./BotaoContinuar";
import InputCustomizado from "./InputCustomizado";

const Agenda = () => {
  return (
    <section className="secao-agenda">
      <div className="container-agenda">
        <h2>Fala mais do seu projeto pra nós</h2>

        <form className="form-agenda">
          <div className="linha1">
            <label>
              Profissional:
              <InputCustomizado
                tipo="text"
                nome="profissional"
                placeholder="Fulana da Silva"
                // valor={formData.nome}
                // aoMudar={handleChange}
                disabled
                tamanho="100%"
              />
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
          <br /><br />
          <BotaoContinuar texto="confirmar" largura="35%" />
        </form>
      </div>
    </section>
  );
};

export default Agenda;
