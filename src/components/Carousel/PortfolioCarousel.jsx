import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import axios from "axios";
import "../Carousel/PortfolioCarousel.css";

function PortfolioCarousel({ idusuario, modoEdicao = false, modoCompacto = false }) {
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

  const handleExcluirImagem = async (idportfolio) => {
    try {
      await axios.delete(`http://localhost:3301/api/portfolio/${idportfolio}`);
      setPortfolio((prev) =>
        prev.filter((img) => img.idportfolio !== idportfolio)
      );
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
    }
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev + 1) % portfolio.length);
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev === 0 ? portfolio.length - 1 : prev - 1
    );
  };

  const imagensVisiveis = () => {
    const total = portfolio.length;
    const items = [];

    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % total;
      items.push(portfolio[index]);
    }

    return items;
  };

  const visivel = imagensVisiveis();

  if (carregando) return <p>Carregando portfólio...</p>;
  if (!portfolio.length) return <p>Esse profissional ainda não adicionou imagens ao portfólio.</p>;

  return (
    <div className={`portfolio-carousel ${modoCompacto ? "compacta" : ""}`}>
      <button onClick={handleNext} className="btn-carousel">
        <ChevronLeft className="icone-navegacao" />
      </button>
      <div className="carousel-container">
        {visivel.map((item, index) => (
          <div key={index} className="imagem-container">
            {item.id > 28 ? (
              <img
                src={String(item.descricao)}
                alt={`Imagem do portfólio ${index + 1}`}
                className="img-portfolio"
              />
            ) : (
              <img
                src={item.imagem}
                alt={`Imagem do portfólio ${index + 1}`}
                className="img-portfolio"
              />
            )}
            {modoEdicao && (
              <button
                className="btn-delete"
                onClick={() => handleExcluirImagem(item.idportfolio)}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="btn-carousel">
        <ChevronRight className="icone-navegacao" />
      </button>
    </div>
  );
}

export default PortfolioCarousel;
