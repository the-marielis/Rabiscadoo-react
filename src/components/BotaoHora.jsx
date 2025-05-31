import React, { useState } from 'react';

const horarios = [
  '09:00',
  '10:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '21:00',
  '22:00',
];

export const SeletorDeHorario = () => {
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '600px', // garante espaço suficiente
        margin: '0 auto',  // centraliza
      }}
    >
      {horarios.map(horario => (
        <button
          key={horario}
          onClick={() => setHorarioSelecionado(horario)}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: horarioSelecionado === horario ? '#007bff' : '#fff',
            color: horarioSelecionado === horario ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          {horario}
        </button>
      ))}
    </div>
  );
}
