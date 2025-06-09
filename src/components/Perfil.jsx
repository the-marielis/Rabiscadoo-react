import React from "react";
import "../css/perfilUsuario.css";
import BotaoContinuar from "./BotaoContinuar";
import HistoricoList from "../components/HistoricoList/HistoricoList";
import { GoPencil } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { GoGear } from "react-icons/go";
import { VscInfo } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext"; 

const Perfil = () => {
    const { usuario } = useAuth();

  return (
    <div
      className="perfil-container"
      style={{ backgroundImage: "url('/images/BACKGROUND_LOGIN.png')" }}
    >
      <section className="perfil-card">
        <h1 className="perfil-title">Sua conta</h1>

        <div className="perfil-grid">
          <article className="perfil-box info-principal">
            {/* Ícone/avatar + dados */}
            
            <div className="avatar"></div>
            <div className="dados">
              <div className="linha-nome">
                  <h2>{usuario?.nome || "Nome do Usuário"}</h2>
                <GoPencil />
              </div>
              <p>{usuario?.email || "email@email.com"}</p>
              <p>Telefone: {usuario?.telefone || "Não informado"}</p>
              <p>Data de nascimento: {usuario?.nascimento || "00/00/0000"}</p>
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
            <p className="delete"><br />Deletar conta</p>
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
          <br /> <br />
        </div>

        <BotaoContinuar texto="confirmar" largura="35%"/>
      </section>
    </div>
  );
};

export default Perfil;
