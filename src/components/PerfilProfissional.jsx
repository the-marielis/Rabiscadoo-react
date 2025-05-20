// src/pages/PerfilProfissional.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../css/perfilProfissional.css";
import axios from 'axios';

function PerfilProfissional() {
  const { idusuario } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarProfissional = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3301/api/profissionais/${idusuario}`);
        setProfissional(resposta.data);
      } catch (err) {
        console.error("Erro ao buscar profissional:", err);
      } finally {
        setCarregando(false);
      }
    };

    buscarProfissional();
  }, [idusuario]);

  if (carregando) return <p>Carregando informações do profissional...</p>;
  if (!profissional) return <p>Profissional não encontrado.</p>;

  return (
    <section className="perfil-profissional">
  <div className="perfil-topo">
    <img src={profissional.imagem} alt={profissional.nome} />

    <div className="bloco-info">
      <div className="info-perfil">
        <h2>Olá! Sou {profissional.nome}</h2>
        <div className="dados-basicos">
          <p><strong>Estilo:</strong> {profissional.estilo}</p>
          <p><strong>Idade:</strong> {profissional.idade} anos</p>
          <p><strong>Cidade:</strong> {profissional.cidade}</p>
        </div>
      </div>

      <div className="descricao">
        <p><strong>Descrição:</strong> {profissional.descricao}</p>
      </div>
    </div>

    <button className="botao-agenda">agenda aqui</button>
  </div>

  <div className="portfolio-carousel">
    {/* imagens do portfólio aqui */}
  </div>

  <div className="background-overlay"></div>
</section>
  );
}
export default PerfilProfissional;