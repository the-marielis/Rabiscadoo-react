import React from 'react';

export const BotaoHora = ({ hora, ativo, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.3rem 0.8rem',
        borderRadius: '8px',
        border: ativo ? '2px solid #9831b8' : '1px solid #ccc',
        backgroundColor: ativo ? '#9831b8' : '#e0e0e0',
        color: ativo ? '#ffffff' : '#310352',
        cursor: 'pointer',
      }}
    >
      {hora}
    </button>
  );
};

export default BotaoHora;
