import React from "react";
import { GoPencil, GoHistory, GoGear } from "react-icons/go";
import "../css/perfilUsuario.css";
import BotaoContinuar from "./BotaoContinuar";

const HomeLogado = () => {
  return (
    <div
      className="perfil-container"
      style={{ backgroundImage: "url('/images/BACKGROUND_LOGIN.png')" }}
    >
      <section className="perfil-card">
        <h1 className="perfil-title">Seu espaço</h1>

        <div className="perfil-grid">
          <article className="perfil-box info-principal">
            {/* Ícone/avatar + dados */}

            <div className="avatar-tatu"></div>
            <div className="dados">
              <div className="linha-nome">
                <h2>Nome do Tatuador</h2>
                <GoPencil />
              </div>
              <p>email@email.com</p>
              <p>Telefone: 00 0000-0000</p>
              <p>Data de nascimento: 00/00/0000</p>
              <div className="linha-informacoes">
                  <div className="linha-historicos">
                    <h3>Históricos</h3>
                    <GoHistory />
                  </div>
                  <p>Pedidos finalizados</p>
                  <p>Suas avaliações</p>
                  <p>Chats arquivados</p>
                  <div className="linha-privacidade">
                    <h3>Privacidade e Segurança</h3>
                    <GoGear />
                  </div>
                  <p>Alterar senha</p>
                  <p>Mudar para perfil profissional</p>
                  <p>Alterar preferências da conta</p>
                  <p>Ocultar pessoas</p>
                  <p className="delete">
                    <br />
                    Deletar conta
                  </p>
              </div>
            </div>
          </article>

          <article className="perfil-box agendamentos">
            <div className="linha-agendas">
              <h3>Próximos Agendamentos</h3>
            </div>
            <p>Nome</p>
            <p>Notificações</p>
            <p>Data</p>
            <p>Hora</p>

            <div className="portfolio">
            <br />
              <h3>Portfólio</h3>
              <p>Aqui ficará o carrossel do portfolio</p>
            </div>


          </article>
          <br />
        </div>
        <BotaoContinuar texto="confirmar" largura="35%"/>
      </section>
    </div>
  );
};

export default HomeLogado;
