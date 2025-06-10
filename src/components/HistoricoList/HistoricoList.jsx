import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./HistoricoList.css";      // se quiser estilizar separado

const HistoricoList = () => {
  const { usuario } = useAuth();
  const [itens, setItens]       = useState([]);
  const [carregando, setLoad]   = useState(true);
  const [erro, setErro]         = useState(null);

  useEffect(() => {
    if (!usuario?.idusuario) return;
    console.log("Buscando histórico de:", usuario?.idusuario);       // ainda não carregou o contexto
    axios.get(`http://localhost:3301/api/historico-agendamentos/${usuario.idusuario}`)

      .then((res) => {
        setItens(res.data);
        setLoad(false);
        console.log("Dados recebidos:", res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar histórico:", err);
        setErro("Você ainda não concluiu nenhum agendamento");
        setLoad(false);
      });
  }, [usuario.idusuario]);

  if (carregando) return <p>carregando...</p>;
  if (erro)       return <p>{erro}</p>;
  if (itens.length === 0) return <p>Você ainda não concluiu nenhum agendamento.</p>;

  return (
    <ul className="historico-list">
      {itens.map((item) => (
        <li key={item.idagendamento} className="historico-item">
          <span className="data">{item.data} às {item.hora}</span>
          <span className="servico">{item.servico}</span>
          <span className="profissional">com {item.profissional}</span>
          <span className="valor">R$ {Number(item.valor).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
};

export default HistoricoList;
