import React, { useState, useEffect } from "react";
import "../css/agendamento.css";
import Calendario from "./Calendario";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";

const Agendamento = () => {
  const navigate = useNavigate();
  const { idservico } = useParams();
  const [horarioSelecionado, setHorarioSelecionado] = useState(null); // ← aqui
  // const idusuario = localStorage.getItem("idusuario"); // ou pega de onde você estiver salvando
  const { usuario, logout } = useAuth();
  const [idPerfil_tatuador, setIdPerfil_tatuador] = useState(null);


  useEffect(() => {
    if (idservico) {
      axios
          .get(`http://localhost:3301/api/servico-Tatuador/${idservico}`)
          .then((res) => {
            const perfilID = res.data.idPerfil_tatuador; // verifique se esse é o nome do campo correto
            setIdPerfil_tatuador(perfilID);
            console.log("OLHA O TATUAS: ", perfilID )
          })
          .catch((err) => console.error(err));
    }
  }, [idservico]);




  useEffect(() => {
    if (idPerfil_tatuador) {
      axios
          .get(`http://localhost:3301/api/horarios-ocupados/${idPerfil_tatuador}`)
          .then((res) => {
            setHorariosOcupados(res.data); // salva os horários ocupados
            console.log("AAA")
            console.log(res.data);
          })
          .catch((err) => console.error(err));
    }
  }, [idPerfil_tatuador]);

  const [horariosOcupados, setHorariosOcupados] = useState([]);


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

  const pegaIdAgendamento = async () => {
    try {
      console.log("AAAAAAAAAAA");
      console.log(dataagendamento);
      console.log(horaagendamento);
      console.log(idservico);
      console.log(idusuario);

      const res = await axios.post("http://localhost:3301/api/pegaIdAgendamento", {
        dataagendamento,
        horaagendamento,
        idservico,
        idusuario,
      });

      if (res.status === 200 && res.data?.idagendamento) {
        const idagendamento = res.data.idagendamento;
        console.log(idagendamento);
        navigate(`/fechar-orcamento/${idagendamento}`);
      } else {
        console.log(res.status );
        console.log(res.data?.idagendamento);
        alert("SOCORRROOOO");
      }

    } catch (err) {
      console.error("Erro ao agendar:", err);
      alert("ErroAASsasasasasas ao buscar agendamento");
    }
  };




  const handleContinuar = async () => {

    if (!horarioSelecionado || !idPerfil_tatuador
        || !idservico
    ) {

      alert("Selecione um horário antes de continuar.");
      return;
    }

    const [dataagendamento, horaagendamento] = horarioSelecionado.split(" ");

    const idusuario =  usuario?.idusuario

    try {

    axios
      .post("http://localhost:3301/api/salvarAgendamento", {
        dataagendamento,
        horaagendamento,
        idservico,
        idusuario,
      })
      .then((res) => {
       if (res.status === 201) {

         console.log("AAAAAAAAAAA");
         console.log(dataagendamento);
         console.log(horaagendamento);
         console.log(idservico);
         console.log(idusuario);

           axios.post("http://localhost:3301/api/pegaIdAgendamento", {
           dataagendamento,
           horaagendamento,
           idservico,
           idusuario,
         }).then((age) => {


             if (age) {
               const idagendamento = age.data.idagendamento
               navigate(`/fechar-orcamento/${idagendamento}`);
             } else {
               console.log("LOL")
               console.log(res);
               console.log(res.data?.idagendamento.toString() );
               console.log(res.data?.idagendamento);
               alert("SOCORRROOOO");
             }

           })





       } else{
         console.log(res.status);
         alert("primeirto");
       }

      })
    }catch (error) {
      console.error("Erro ao processar agendamento:", error);
      alert("Erro ao processar o agendamento. Verifique o console.");
    }
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
            horariosOcupados={horariosOcupados}
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
            horariosOcupados={horariosOcupados}
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
