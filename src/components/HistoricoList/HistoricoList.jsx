import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./HistoricoList.css";      // se quiser estilizar separado

const HistoricoList = ({
  papel  = "cliente",   // "cliente" ou "tatuador"
  scope  = "todos",     // "todos" | "proximos" | "passados"
}) => {
  const { usuario } = useAuth();
  const [itens, setItens]     = useState([]);
  const [carregando, setLoad] = useState(true);
  const [erro, setErro]       = useState(null);

  useEffect(() => {
    if (!usuario?.idusuario) return;

    axios.get(
      `http://localhost:3301/api/historico-agendamentos/${usuario.idusuario}`,
      { params: { papel, scope } }
    )
    .then(({ data }) => { setItens(data); setLoad(false); })
    .catch(() => { setErro("Nada encontrado."); setLoad(false); });
  }, [usuario.idusuario, papel, scope]);

  if (carregando) return <p>carregando...</p>;
  if (erro)       return <p>{erro}</p>;
  if (!itens.length) return <p>Nenhum agendamento.</p>;

  return (
    <ul className="historico-list">
      {itens.map((item) => (
        <li key={item.idagendamento} className="historico-item">
          <span className="data">{item.data} às {item.hora}</span>
          <span className="servico">{item.servico}</span>

          {papel === "tatuador"
            ? <span className="cliente">cliente: {item.cliente}</span>
            : <span className="profissional">com {item.profissional}</span>}

          <span className="valor">R$ {Number(item.valor).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
};


export default HistoricoList;
