// src/componentes/CamposCadastro.jsx
import React from 'react';

const CamposCadastro = ({ formData, handleChange, handleDateFocus, handleDateBlur, handleInput }) => {
  return (
    <div className="input-group">
      <div className="line1">
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome Completo"
          required
          maxLength="900"
          value={formData.nome}
          onChange={handleChange}
        />
      </div>
      <div className="line2">
        <input
          type="text"
          id="nascimento"
          name="nascimento"
          placeholder="Nascimento"
          value={formData.nascimento}
          onFocus={handleDateFocus}
          onBlur={handleDateBlur}
          onChange={handleChange}
        />
        <input
          type="text"
          id="CPF"
          name="CPF"
          placeholder="CPF"
          required
          maxLength="9"
          onInput={handleInput}
          style={{ marginLeft: '1%' }}
          value={formData.CPF}
          onChange={handleChange}
        />
        <input
          type="text"
          id="RG"
          name="RG"
          placeholder="RG"
          maxLength="9"
          onInput={handleInput}
          style={{ marginLeft: '1%' }}
          value={formData.RG}
          onChange={handleChange}
        />
      </div>
      <div className="line3">
        <input
          type="text"
          id="cidade"
          name="cidade"
          placeholder="Qual sua cidade?"
          required
          value={formData.cidade}
          onChange={handleChange}
        />
      </div>
      <div className="line4">
        <input
          type="text"
          id="CEP"
          name="CEP"
          placeholder="CEP"
          required
          maxLength="8"
          onInput={handleInput}
          value={formData.CEP}
          onChange={handleChange}
        />
        <input
          type="text"
          id="endereco"
          name="endereco"
          placeholder="Endereço completo"
          required
          value={formData.endereco}
          onChange={handleChange}
        />
      </div>
      <div className="line5">
        <input
          type="text"
          id="telefone1"
          name="telefone"
          placeholder="Telefone principal"
          required
          maxLength="11"
          onInput={handleInput}
          value={formData.telefone}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="telefone2"
          name="telefone2"
          placeholder="Telefone para recado"
          maxLength="11"
          style={{ marginLeft: '1%' }}
          onInput={handleInput}
          value={formData.telefone2}
          onChange={handleChange}
        />
      </div>
      <div className="line6">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          id="user"
          name="nome_usuario"
          placeholder="Nome de usuário"
          required
          style={{ marginLeft: '1%' }}
          value={formData.nome_usuario}
          onChange={handleChange}
        />
      </div>
      <div className="line7">
        <input
          type="password"
          id="password"
          name="senha"
          placeholder="Digite sua senha"
          required
          value={formData.senha}
          onChange={handleChange}
        />
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
          <label htmlFor="tp_cadastro"><b>Você é:</b></label>
        </div>
        <div className="option">
          <input
            type="radio"
            id="tp-rabiscadoo"
            name="tp_cadastro"
            value="rabiscadoo"
            checked={formData.tp_cadastro === 'rabiscadoo'}
            onChange={handleChange}
          />
          <label htmlFor="tp-rabiscadoo">Rabiscadoo</label>
          <br />
          <input
            type="radio"
            id="tp-tatu"
            name="tp_cadastro"
            value="tatuador"
            checked={formData.tp_cadastro === 'tatuador'}
            onChange={handleChange}
          />
          <label htmlFor="tp-tatu">Tatuador</label>
        </div>
      </div>
    </div>
  );
};

export default CamposCadastro;
