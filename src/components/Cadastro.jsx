import React, { useState } from 'react';
import axios from 'axios';
import '../css/cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import CamposCadastro from '../components/CamposCadastro.jsx';

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

  const [mensagemErro, setMensagemErro] = useState('');
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');

    try {
      const response = await axios.post('http://localhost:3301/api/cadastro', formData);
      console.log(response.data);
      alert('Cadastro realizado com sucesso!');
      return Navigate("/login");
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setMensagemErro(error.response.data.error);
      } else {
        setMensagemErro('Erro ao cadastrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-image">
        <img src="/images/mancha2.png" alt="mancha" id="img-direita" />
      </div>
      <div className="form-image2">
        <img src="/images/mancha3.png" alt="mancha" id="img-esquerda" />
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
                  <Link to="/login">Entrar</Link>
                </button>
              </div>
            </div>

            <CamposCadastro
              formData={formData}
              handleChange={handleChange}
              handleDateFocus={handleDateFocus}
              handleDateBlur={handleDateBlur}
              handleInput={handleInput}
            />

            <div className="continue-button">
              {mensagemErro && (
                <p style={{ color: 'red', marginBottom: '10px' }}>{mensagemErro}</p>
              )}
              <button type="submit">bora lá!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;
