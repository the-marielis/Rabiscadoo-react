import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { FaTrash, FaChevronLeft, FaArrowRight } from "react-icons/fa";
import "../css/orcamento.css";
import Toast from "./Toast/Toast.jsx";

const FecharOrcamento = () => {
  const { idagendamento } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [addToGoogle, setAddToGoogle] = useState(false);
  const [toast, setToast]  = useState(null);

  const showToast = (message, type = "error") => setToast({ message, type });

  useEffect(() => {
    axios
      .get(`http://localhost:3301/api/fechar-orcamento/${idagendamento}`)
      .then((res) => setDados(res.data))
      .catch((err) =>
        console.error("Erro ao buscar dados do agendamento:", err)
      );
  }, [idagendamento]);

  if (!dados) return <p>Carregando informações...</p>;

  const handleConfirm = () => {
    // aqui tu chama teu endpoint de confirmação, depois redireciona
    alert("Orçamento confirmado!");
    // if (addToGoogle) { ... }
    navigate("/"); // exemplo
  };


    const remover = () => {
        const confirmar = window.confirm("Tem certeza que deseja deletar este agendamento?");
        if (!confirmar) return; // Se o usuário clicar em "Cancelar", não faz nada

        axios
            .delete(`http://localhost:3301/api/fechar-orcamento/deletar/${idagendamento}`)
            .then(() => {
                showToast("⚠️Agendamento Deletado ⚠️", "success");

                // Espera 2 segundos antes de navegar
                setTimeout(() => {
                    navigate(`/perfil`);
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
    <div className="orcamento">
      <h1>Confirmação de Orçamento</h1>

      <div className="container-orcamento">
        <div className="header-orcamento">
          <span>
            {dados.dataagendamento} ÀS {dados.horaagendamento}
          </span>
          <FaTrash className="trash" onClick={() => remover()} />
        </div>

        <p>
          <strong>Profissional:</strong> {dados.profissional}
        </p>
        <p>
          <strong>Serviço:</strong> {dados.servico}
        </p>
        <p>
          <strong>Valor total*:</strong> R$ {dados.valororcado},00
        </p>
        <p>
          <strong>Pagamento:</strong> Parcelamento feito com o profissional
        </p>
        <p>
          <strong>Endereço:</strong> Av. Brasil 5544 – Centro – Cascavel – PR
        </p> <br />
      </div>

      <label className="checkbox-linha">
        <input
          type="checkbox"
          checked={addToGoogle}
          onChange={(e) => setAddToGoogle(e.target.checked)}
        />
        Adicionar lembrete à minha agenda do Google
      </label>
       <div className="continuar">
        <button onClick={handleConfirm}>
          CONTINUAR <ChevronRight className="icone-navegacao" />
        </button>
      </div>
      <div className="footer-orcamento">
      <p>*Valor total é a soma do valor negociado no orçamento com o profissional somado ao valor de manutenção da plataforma</p>
      </div>
    </div>
  </>
  );
};

export default FecharOrcamento;
