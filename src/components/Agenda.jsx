import React from "react";
import '../css/agenda.css';

const Agenda = () => {
  return (
    <section className="secao-agenda">
      <div className="form-container">
        <h2>Fala mais do seu projeto pra nós</h2>

        <form>
          <div className="linha">
            <label>
              Profissional:
              <input type="text" value="Fulana da Silva" disabled />
            </label>

            <label>
              Estilo da tattoo:
              <select>
                <option value="">selecione</option>
                {/* Adicione mais opções aqui */}
              </select>
            </label>
          </div>

          <div className="linha">
            <label>
              Tamanho:
              <input type="text" placeholder="cm" />
            </label>

            <label>
              Local do corpo:
              <input type="text" placeholder="escreve aqui" />
            </label>

            <label>
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

          <div className="linha">
            <input type="file" />
          </div>

          <button type="submit">confirmar</button>
        </form>
      </div>
    </section>
  );
};

export default Agenda;