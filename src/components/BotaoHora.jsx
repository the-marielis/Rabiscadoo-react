import React from 'react';

export const BotaoHora = ({ hora, ativo, ocupado, onClick }) => {
  const corFundo = ocupado
    ? "#f0f0f0"
    : ativo
    ? "#9831b8"
    : "#e0e0e0";

  const corTexto = ocupado
    ? "#999"
    : ativo
    ? "#ffffff"
    : "#310352";

  const borda = ativo
    ? "2px solid #9831b8"
    : "1px solid #ccc";

  const cursor = ocupado ? "not-allowed" : "pointer";

  return (
    <button
      onClick={onClick}
      disabled={ocupado}
      style={{
        padding: "0.4rem 0.8rem",
        borderRadius: "8px",
        border: borda,
        backgroundColor: corFundo,
        color: corTexto,
        cursor: cursor,
        fontWeight: 500,
        fontFamily: "var(--fonte-padrao)",
        fontSize: "0.9rem",
        transition: "all 0.2s ease",
        opacity: ocupado ? 0.6 : 1,
        pointerEvents: ocupado ? "none" : "auto"
      }}
    >
      {hora}
    </button>
  );
};

