import React from 'react';
import axios from 'axios';
import '../cadastro.css'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    CPF: '',
    RG: '',
    cidade: '',
    CEP: '',
    endereco: '',
    telefone: '',
    telefone2: '',
    email: '',
    nome_usuario: '',
    senha: '',
    tp_cadastro: '',
  });

  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Atualizando:", name, value);
    console.log("formData agora:", { ...formData, [name]: value });

    console.log(formData);

    try {
      const response = await axios.post('http://localhost:3301/api/cadastro', formData);
      console.log(response.data);
      alert('Cadastro realizado com sucesso!');
      return Navigate("/login")
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

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
        <img src="/images/mancha1.png" alt="mancha" id="img-direita" />
      </div>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="title">
                <h1>Cadastre-se já</h1>
              </div>
              <div className="login-button">
                <button style={{ marginRight: '50px' }}>
                  <Link to="/login"> Entrar</Link>
                </button>
              </div>
            </div>
            <div className="input-group">
              <div className="line1">
                <input type="text" 
                id="nome" 
                name="nome" 
                placeholder="Nome Completo" 
                required 
                maxLength="900" 
                onChange={handleChange} />
              </div>
              <div className="line2">
                <input
                  type="text"
                  id="nascimento"
                  name="nascimento"
                  placeholder="Nascimento"
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
                  onInput={handleInput}
                  maxLength="9"
                  style={{ marginLeft: '1%' }}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="RG"
                  name="RG"
                  placeholder="RG"
                  onInput={handleInput}
                  maxLength="9"
                  style={{ marginLeft: '1%' }}
                  onChange={handleChange}
                />
              </div>
              <div className="line3">
                <input type="text" 
                id="cidade" 
                name="cidade" 
                placeholder="Qual sua cidade?" 
                required  
                onChange={handleChange}/>
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
                  onChange={handleChange}
                />
                <input type="text" 
                id="endereco" 
                name="endereco" 
                placeholder="Endereço completo" 
                required 
                onChange={handleChange} />

              </div>
              <div className="line5">
                <input
                  type="text"
                  id="telefone1"
                  name="telefone"
                  placeholder="Telefone principal"
                  required
                  onInput={handleInput}
                  maxLength="11"
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  id="telefone2"
                  name="telefone2"
                  placeholder="Telefone para recado"
                  onInput={handleInput}
                  maxLength="11"
                  style={{ marginLeft: '1%' }}
                  onChange={handleChange}
                />
              </div>
              <div className="line6">
                <input type="email" id="email" name="email" placeholder="Digite seu e-mail"  required onChange={handleChange}/>
                <input
                  type="text"
                  id="user"
                  name="nome_usuario"
                  placeholder="Nome de usuário"
                  required
                  style={{ marginLeft: '1%' }}
                  onChange={handleChange}
                />
              </div>
              <div className="line7">
                <input type="password" id="password" name="senha" placeholder="Digite sua senha" required onChange={handleChange}/>
                <input
                  type="password"
                  id="confirme-senha"
                  name="confirme-senha"
                  placeholder="Confirme sua senha"
                  required
                  style={{ marginLeft: '1%' }}
                  onChange={handleChange}
                />
              </div>
              <div className="tp-cadastro">
                <div className="tipo">
                  <label htmlFor="tp_cadastro"><b>Você é:</b></label>
                </div>
                <div className="option">
                  <input type="radio" id="tp-rabiscadoo" 
                  name="tp_cadastro" value="rabiscadoo" 
                  onChange={handleChange} />{' '}
                  <label htmlFor="tp-rabiscadoo">Rabiscadoo</label>
                  <br />

                  <input type="radio"
                  id="tp-tatu" name="tp_cadastro" 
                  value="tatuador" 
                  onChange={handleChange} />{' '}
                  <label htmlFor="tp-tatu">Tatuador</label>
                </div>
              </div>
            </div>
            <div className="continue-button">
              <button type="submit">bora lá!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;