import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FecharOrcamento = () => {
  const { idagendamento } = useParams();
  const [dados, setDados] = useState(null);
  const valor = 300.00; // valor fixo

  useEffect(() => {
    axios.get(`http://localhost:3301/api/fechar-orcamento/${idagendamento}`)
      .then((res) => {
        setDados(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do agendamento:", err);
      });
  }, [idagendamento]);

  if (!dados) return <p>Carregando informações...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Fechar Orçamento</h1>
      <p><strong>Cliente:</strong> {dados.cliente}</p>
      <p><strong>Profissional:</strong> {dados.profissional}</p>
      <p><strong>Serviço:</strong> {dados.servico}</p>
      <p><strong>Data:</strong> {dados.dataagendamento}</p>
      <p><strong>Hora:</strong> {dados.horaagendamento}</p>
      <p><strong>Valor:</strong> R$ {valor.toFixed(2)}</p>

      <button style={{ marginTop: '1rem' }} onClick={() => alert("Orçamento confirmado!")}>
        Confirmar Orçamento
      </button>
    </div>
  );
};

export default FecharOrcamento;
