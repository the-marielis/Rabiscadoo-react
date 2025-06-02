import React, { useState } from "react";
import "../css/agendamento.css";
import Calendario from "./Calendario";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Agendamento = () => {
  const navigate = useNavigate();
  const { idservico } = useParams();
  const [horarioSelecionado, setHorarioSelecionado] = useState(null); // ← aqui

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const feriadosFixos = [
    "01-01",
    "21-04",
    "01-05",
    "07-09",
    "12-10",
    "02-11",
    "15-11",
    "25-12",
  ];

  const gerarDatasValidas = () => {
    const hoje = new Date();
    const datas = [];

    while (datas.length < 12) {
      const diaSemana = hoje.getDay();
      const dia = String(hoje.getDate()).padStart(2, "0");
      const mes = String(hoje.getMonth() + 1).padStart(2, "0");
      const feriado = `${dia}-${mes}`;

      if (diaSemana !== 0 && !feriadosFixos.includes(feriado)) {
        datas.push(new Date(hoje));
      }

      hoje.setDate(hoje.getDate() + 1);
    }

    return datas;
  };

  const datasValidas = gerarDatasValidas();

  const formatarData = (data) => {
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
  };

  const handleContinuar = () => {
    console.log("Horário escolhido:", horarioSelecionado); // depois você pode mandar pro back
    navigate(`/${idservico}/agendamento/orcamento`);
  };

  return (
    <div className="agendamento-container">
      <div className="titulo-calendario">
        <h1>Escolha o dia e horário:</h1>
      </div>

      <div className="lista-calendario">
        {datasValidas.slice(0, 6).map((data, index) => (
          <Calendario
            key={index}
            data={data}
            title={formatarData(data)}
            horarioSelecionado={horarioSelecionado}
            setHorarioSelecionado={setHorarioSelecionado}
          />
        ))}
      </div>

      <div className="lista2-calendario">
        {datasValidas.slice(6).map((data, index) => (
          <Calendario
            key={index + 6}
            data={data}
            title={formatarData(data)}
            horarioSelecionado={horarioSelecionado}
            setHorarioSelecionado={setHorarioSelecionado}
          />
        ))}
      </div>

      <div className="continuar">
        <button onClick={handleContinuar}>
          CONTINUAR <ChevronRight className="icone-navegacao" />
        </button>
      </div>
    </div>
  );
};

export default Agendamento;
