// src/componentes/BotaoContinuar.jsx
import React from 'react';
import styled from 'styled-components';


const ButtonWrapper = styled.div`
  width: 50%;
  margin-left: 30vh;
  margin-top: -5vh;
`;

const StyledButton = styled.button`
  padding: 2% 5%;
  background-color: var(--cor0);
  border-radius: 10px;
  margin-left: 95%;
   width: ${({ largura }) => largura || "35%"};
  box-shadow: -3px 2px 1px #9831b8;
  border: none;
  z-index: 1;
  position: relative;
  font-weight: 400;
  transition: all 250ms;
  overflow: hidden;
  text-decoration: none;
  font-family: var(--fonte-padrao);
  color: var(--cor2);
  font-size: 1rem;
  letter-spacing: 0.1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 2%;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    transition: all 250ms;
  }

  &:hover {
    color: #e8e8e8;
  }

  &:hover::before {
    width: 100%;
  }
`;

const BotaoContinuar = ({ mensagemErro = "", texto, largura }) => {
  return (
    <ButtonWrapper>
      {mensagemErro && (
        <p style={{ color: 'red', marginBottom: '10px' }}>{mensagemErro}</p>
      )}
      <StyledButton type="submit" largura={largura}>{texto}</StyledButton>
    </ButtonWrapper>
  );
};

export default BotaoContinuar;
