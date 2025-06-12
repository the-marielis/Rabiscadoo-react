// src/components/PortfolioCarousel.jsx
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import "../Carousel/PortfolioCarousel.css"; // ou crie outro CSS se preferir

function PortfolioCarousel({ idusuario, imagensPorPagina = 5, modoCompacto = false }) {
  const [portfolio, setPortfolio] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const buscarPortfolio = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3301/api/profissionais/${idusuario}`);
        setPortfolio(resposta.data.portfolio || []);
      } catch (err) {
        console.error("Erro ao buscar portfólio:", err);
      } finally {
        setCarregando(false);
      }
    };

    if (idusuario) {
      buscarPortfolio();
    }
  }, [idusuario]);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - imagensPorPagina, 0));
  };

  const handleNext = () => {
    setStartIndex(prev =>
      Math.min(prev + imagensPorPagina, portfolio.length - imagensPorPagina)
    );
  };

  const imagensVisiveis = portfolio.slice(startIndex, startIndex + imagensPorPagina);

  if (carregando) return <p>Carregando portfólio...</p>;
  if (!portfolio.length) return <p>Esse profissional ainda não adicionou imagens ao portfólio.</p>;

  return (
    <div className={`portfolio-carousel ${modoCompacto ? "compacta" : ""}`}>
      <button onClick={handlePrev} className="btn-carousel">
        <ChevronLeft className="icone-navegacao" />
      </button>
      <div className="carousel-container">
        {imagensVisiveis.map((item, index) => (
          <img
            key={index}
            src={item.imagem}
            alt={`Imagem do portfólio ${index + 1}`}
            className="img-portfolio"
          />
        ))}
      </div>
      <button onClick={handleNext} className="btn-carousel">
        <ChevronRight className="icone-navegacao" />
      </button>
    </div>
  );
}

export default PortfolioCarousel;
