import React from 'react';
import { BotaoHora } from "./BotaoHora";

const horarios = [
  "09:00", "10:30","11:30" , "13:30", "14:30", "15:30", "16:30", "17:30", "18:30"
];

export const Calendario = ({ title, data, horarioSelecionado, setHorarioSelecionado }) => {
  const dataFormatada = data.toISOString().split("T")[0]; // ex: "2025-06-03"

  const handleClick = (hora) => {
    const combinado = `${dataFormatada} ${hora}`;
    setHorarioSelecionado(combinado);
  };

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
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 colunas fixas iguais
        gap: '0.5rem',
        justifyContent: 'center',   // pode deixar ou tirar, opcional
      }}>
        {horarios.map((hora) => {
          const combinado = `${dataFormatada} ${hora}`;
          const ativo = combinado === horarioSelecionado;

          return (
            <BotaoHora
              key={hora}
              hora={hora}
              ativo={ativo}
              onClick={() => handleClick(hora)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendario;
