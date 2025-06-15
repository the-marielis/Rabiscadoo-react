import React from "react";
import { Calendar } from "lucide-react"; // opcional, pode usar qualquer ícone
import { converteDataUsa } from "../../Utils/converteData";
import "./BotaoGoogleCalendar.css";
const BotaoGoogleCalendar = ({ agendamento }) => {
  const criarEventoGoogleCalendar = () => {
    const dataFormatada = converteDataUsa(agendamento.dataagendamento);
    const dataString = `${dataFormatada}T${agendamento.horaagendamento}:00`;

    const dataInicio = new Date(dataString);
    const dataFim = new Date(dataInicio.getTime() + 60 * 60 * 1000); // 1 hora depois

    const formatarDataGoogle = (data) => {
      return data.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const inicio = formatarDataGoogle(dataInicio);
    const fim = formatarDataGoogle(dataFim);

    const titulo = `Sessão de Tatuagem - ${agendamento.servico || "Tatuagem"}`;

    const descricao = `
Cliente: ${agendamento.cliente}
Tatuador: ${agendamento.profissional}
Serviço: ${agendamento.servico}
Valor: R$ ${agendamento.valororcado},00
Endereço: Av. Brasil 5544 – Centro – Cascavel – PR
`.trim();

    const baseUrl = "https://calendar.google.com/calendar/render";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: titulo,
      dates: `${inicio}/${fim}`,
      details: descricao,
      location: "Estúdio Rabiscadoo - Av. Brasil 5544 – Centro – Cascavel – PR",
    });

    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <button
      className="botao-google-calendar"
      onClick={criarEventoGoogleCalendar}
      title="Adicionar ao Google Calendar"
    >
      <Calendar size={18} style={{ marginRight: "4px" }} />
      Adicionar ao Google Calendar
    </button>
  );
};

export default BotaoGoogleCalendar;
