import React from 'react';

const InputCustomizado = ({
  tipo = "text",
  nome,
  placeholder,
  valor,
  aoMudar,
  aoInput,
  obrigatorio = false,
  maxLength,
  desabilitado = false,
  tamanho = "100%", // opções: "100%", "50%", "33%"
  marginLeft = true, // se quiser desativar o margin-left automático
}) => {
  // Define a largura com base no valor da prop "tamanho"
  let largura;
  switch (tamanho) {
    case "50%":
      largura = "48.5%";
      break;
    case "33%":
      largura = "32%";
      break;
    default:
      largura = "98%";
  }

  const estilos = {
    width: largura,
    marginLeft: marginLeft && largura !== "100%" ? "1%" : "0",
    padding: "0.8rem",
    borderRadius: "0.5rem",
    fontFamily: "var(--fonte-padrao)",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  return (
    <input
      type={tipo}
      name={nome}
      id={nome}
      placeholder={placeholder}
      value={valor}
      onChange={aoMudar}
      onInput={aoInput}
      required={obrigatorio}
      maxLength={maxLength}
      disabled={desabilitado}
      style={estilos}
    />
  );
};

export default InputCustomizado;
