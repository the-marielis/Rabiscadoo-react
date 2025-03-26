import React from 'react';
import '../cadastro.css'; // Importe o arquivo CSS correspondente

const CadastroForm = () => {
  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  return (
    <div className="form-container">
      <div className="form-image">
        <img src="../../public/images/mancha1.png" alt="mancha" id="img-direita" />
      </div>
      <div className="container">
        <div className="form">
          <form action="#">
            <div className="form-header">
              <div className="title">
                <h1>Cadastre-se já</h1>
              </div>
              <div className="login-button">
                <button style={{ marginRight: '50px' }}>
                  <a href="#"> Entrar</a>
                </button>
              </div>
            </div>
            <div className="input-group">
              <div className="line1">
                <input type="text" id="nome" name="nome" placeholder="Nome Completo" required maxLength="900" />
              </div>
              <div className="line2">
                <input
                  type="text"
                  id="nascimento"
                  name="nascimento"
                  placeholder="Nascimento"
                  onFocus={handleDateFocus}
                  onBlur={handleDateBlur}
                  required
                />
                <input
                  type="text"
                  id="CPF"
                  name="CPF"
                  placeholder="CPF"
                  required
                  onInput={handleInput}
                  maxLength="9"
                  style={{ marginLeft: '1%' }}
                />
                <input
                  type="text"
                  id="RG"
                  name="RG"
                  placeholder="RG"
                  required
                  onInput={handleInput}
                  maxLength="9"
                  style={{ marginLeft: '1%' }}
                />
              </div>
              <div className="line3">
                <input type="text" id="cidade" name="cidade" placeholder="Qual sua cidade?" required />
              </div>
              <div className="line4">
                <input
                  type="text"
                  id="CEP"
                  name="CEP"
                  placeholder="CEP"
                  required
                  onInput={handleInput}
                  maxLength="8"
                />
                <input type="text" id="endereco" name="endereco" placeholder="Endereço completo" required />
              </div>
              <div className="line5">
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  placeholder="Telefone principal"
                  required
                  onInput={handleInput}
                  maxLength="11"
                />
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="Telefone para recado"
                  onInput={handleInput}
                  maxLength="11"
                  style={{ marginLeft: '1%' }}
                />
              </div>
              <div className="line6">
                <input type="email" id="email" name="email" placeholder="Digite seu e-mail" />
                <input
                  type="text"
                  id="user"
                  name="user"
                  placeholder="Nome de usuário"
                  required
                  style={{ marginLeft: '1%' }}
                />
              </div>
              <div className="line7">
                <input type="password" id="password" name="password" placeholder="Digite sua senha" required />
                <input
                  type="password"
                  id="confirme-senha"
                  name="confirme-senha"
                  placeholder="Confirme sua senha"
                  required
                  style={{ marginLeft: '1%' }}
                />
              </div>
              <div className="tp-cadastro">
                <div className="tipo">
                  <label htmlFor="tp-cadastro"><b>Você é:</b></label>
                </div>
                <div className="option">
                  <input type="radio" id="tp-rabiscadoo" name="tp-cadastro" />{' '}
                  <label htmlFor="tp-rabiscadoo">Rabiscadoo</label>
                  <br />
                  <input type="radio" id="tp-tatu" name="tp-cadastro" />{' '}
                  <label htmlFor="tp-tatu">Tatuador</label>
                </div>
              </div>
            </div>
            <div className="continue-button">
              <button>
                <a href="#">bora lá!</a>
              </button>
            </div>
          </form>
        </div>
        <div className="form-image2">
          <img src="../cadastro_tatu/images/mancha3.png" alt="mancha" id="img-esquerda" className="imagem-sobreposta" />
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;