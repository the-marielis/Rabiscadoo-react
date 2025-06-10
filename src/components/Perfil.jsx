import React, {useState} from "react";
import "../css/perfilUsuario.css";
import BotaoContinuar from "./BotaoContinuar";
import HistoricoList from "../components/HistoricoList/HistoricoList";
import { GoPencil } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { GoGear } from "react-icons/go";
import { VscInfo } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast/Toast.jsx";

const Perfil = () => {
  const navigate = useNavigate();
  const [toast, setToast]  = useState(null);
  const { usuario,logout } = useAuth();

  const showToast = (message, type = "error") => setToast({ message, type });



const deletarConta =() => {
  console.log("deletarConta");
  let confirmar = window.confirm("Tem certeza que deseja deletar sua conta?");
  if (!confirmar){ return;} // Se o usuário clicar em "Cancelar", não faz nada
  confirmar = window.confirm("Tem certeza MESMO?");
  confirmar = window.confirm("Tem certeza? Faz isso comigo não pufavo");



  axios
      // para prod usar essa
      .delete(`http://localhost:3301/api/usuario/deletar/${usuario?.idusuario}`, {})
      // teste usar essa passando o id que quer deletar
      // .delete(`http://localhost:3301/api/usuario/deletar/133`, {})
      .then(() => {
        console.log("Deletar conta");
        showToast("⚠️ USUARIO Deletado ⚠️", "success");
        // Espera 2 segundos antes de navegar
        setTimeout(() => {
          logout();
          navigate(`/login`);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao deletar agendamento:", error);
        showToast("Erro ao deletar agendamento", "error");
      });

};

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
            <p className="delete" onClick={() => deletarConta()} ><br />Deletar conta</p>
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
          <br /> 
        </div>

        <BotaoContinuar texto="confirmar" largura="35%"/>
      </section>
    </div>
</>
  );
};

export default Perfil;
