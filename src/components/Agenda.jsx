import React from "react";
import '../css/agenda.css';
import BotaoContinuar from './BotaoContinuar';

const Agenda = () => {
  return (
    <section className="secao-agenda">
      <div className="container-agenda">
        <h2>Fala mais do seu projeto pra nós</h2>

        <form>
          <div className="linha-agenda">
            <label className="label-agenda">
              Profissional:
              <input className="input-agenda" type="text" value="Fulana da Silva" disabled />
            </label>

            <label className="label-agenda">
              Estilo da tattoo:
              <select>
                <option value="">selecione</option>
                {/* Adicione mais opções aqui */}
              </select>
            </label>
          </div>

          <div className="linha-agenda">
            <label className="label-agenda">
              Tamanho:
              <input type="text" placeholder="cm" />
            </label>

            <label>
              Local do corpo:
              <input type="text" placeholder="escreve aqui" />
            </label>

            <label className="label-agenda">
              Tattoo colorida?
              <select>
                <option value="">selecione</option>
              </select>
            </label>
          </div>

          <label>
            Qual sua ideia para esse projeto?
            <textarea placeholder="Descreva sua ideia aqui..."></textarea>
          </label>

          <div className="linha-agenda">
            <input type="file" />
          </div>
          <br />
          <BotaoContinuar texto="confirmar" largura="35%" />
        </form>
      </div>
    </section>
  );
};

export default Agenda;