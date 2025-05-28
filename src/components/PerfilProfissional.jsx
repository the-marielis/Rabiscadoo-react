import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/perfilProfissional.css";
import BotaoContinuar from './BotaoContinuar';
import axios from 'axios';

function PerfilProfissional() {
  const { idusuario } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const imagensPorPagina = 5;

  const navigate = useNavigate();

const handleAgendar = () => {
  navigate(`/profissionais/${idusuario}/agenda`);
};


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

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - imagensPorPagina, 0));
  };

  const handleNext = () => {
    if (profissional && profissional.portfolio) {
      setStartIndex(prev =>
        Math.min(prev + imagensPorPagina, profissional.portfolio.length - imagensPorPagina)
      );
    }
  };

  if (carregando) return <p>Carregando informações do profissional...</p>;
  if (!profissional) return <p>Profissional não encontrado.</p>;

  const imagensVisiveis = profissional.portfolio
    ? profissional.portfolio.slice(startIndex, startIndex + imagensPorPagina)
    : [];

  return (
    <section className="perfil-profissional">
      <div className="perfil-topo">
        <img src={profissional.imagem} alt={profissional.nome} />
        <div className="bloco-info">
          <div className="info-perfil">
            <h2>Olá! Sou {profissional.nome}</h2>
            <BotaoContinuar texto="agende aqui" largura="50%" onClick={handleAgendar} />
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


      </div>
      <div className="portfolio-carousel">

        {imagensVisiveis.length > 0 ? (
          <>
            <button onClick={handlePrev} className="btn-carousel">
              <ChevronLeft className="icone-navegacao" />
            </button>
            <div className="carousel-container">
              {imagensVisiveis.map((item, index) => (
                <img
                  key={index}
                  src={item.imagem}
                  alt={`Imagem do portfólio ${startIndex + index + 1}`}
                  className="img-portfolio"
                />
              ))}
            </div>
            <button onClick={handleNext} className="btn-carousel">
              <ChevronRight className="icone-navegacao" />
            </button>
          </>
        ) : (
          <p>Esse profissional ainda não adicionou imagens ao portfólio.</p>
        )}
      </div>

      <div className="background-overlay"></div>
    </section>
  );
}

export default PerfilProfissional;
