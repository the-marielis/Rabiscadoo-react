import React from 'react';
import { BotaoHora } from "./BotaoHora";

export const Calendario = ({
  title,
  data,
  horarioSelecionado,
  setHorarioSelecionado,
  horariosOcupados = []
}) => {
  const dataFormatada = data.toISOString().split("T")[0];

  const handleClick = (hora) => {
    const combinado = `${dataFormatada} ${hora}`;
    setHorarioSelecionado(combinado);
  };

  const horarios = [
    "09:00", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30"
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '0.2rem', 
      borderRadius: 20,
      border: '2px solid #ffff',
      overflow: 'hidden',
    }}>
      <div style={{
        backgroundColor: '#310352',
        padding: '0.5rem 1rem',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: 'white',
          fontFamily: 'var(--fonte-padrao)',
          fontWeight: '100',
          fontSize: '1.2rem'
        }}>
          {title}
        </h2>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: 25,
        display: 'grid',          
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
      }}>
        {horarios.map((hora) => {
          const combinado = `${dataFormatada} ${hora}`;
          const ocupado = horariosOcupados.some(
            (item) =>
              item.dataagendamento === dataFormatada &&
              item.horaagendamento === hora
          );
          const ativo = combinado === horarioSelecionado;

          return (
            <BotaoHora
              key={hora}
              hora={hora}
              ativo={ativo}
              ocupado={ocupado}
              onClick={() => !ocupado && handleClick(hora)}
            />
          );
        })}

        {horarios.every((hora) =>
          horariosOcupados.some(
            (item) =>
              item.dataagendamento === dataFormatada &&
              item.horaagendamento === hora
          )
        ) && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#777' }}>
            Sem horários disponíveis
          </p>
        )}
      </div>
    </div>
  );
};

export default Calendario;
