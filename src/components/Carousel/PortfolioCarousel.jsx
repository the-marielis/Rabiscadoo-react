import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import axios from "axios";
import "../Carousel/PortfolioCarousel.css";

function PortfolioCarousel({ idusuario, modoEdicao = false, modoCompacto = false }) {
  const [portfolio, setPortfolio] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [remove, setremove] = useState([]);

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

  const handleExcluirImagem = async (imagem) => {
    let confirmar = window.confirm("Tem certeza que deseja deletar está imagem??");
    if (!confirmar) return;
    confirmar = window.confirm("Tem certeza MESMO?");
    console.log(imagem);
    console.log(remove);
    setremove([...remove, imagem.id]);


    try {
      await axios.delete(`http://localhost:3301/api/portfolio/${imagem.id}`);
      setPortfolio((prev) =>
        prev.filter((img) => img.idportfolio !== imagem.id)
      );
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
    }
  };

  const handlePrev = () => {setStartIndex((prev) => (prev + 1) % total);};

  const handleNext = () => {setStartIndex((prev) =>  prev === 0 ? total - 1 : prev - 1
    );};

  const imagensFiltradas = portfolio.filter((item) => !remove.includes(item.id));
  const total = imagensFiltradas.length;

  const imagensVisiveis = () => {
    const items = [];
    let index = startIndex;

    while (items.length < 5 && total > 0) {
      items.push(imagensFiltradas[index % total]);
      index++;
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
        {visivel
            .filter((item) => !remove.includes(item.id))
            .map((item, index) => (
          <div key={index} className="imagem-container">
            {(item.id > 28 && !remove.includes(item.id)) ? (
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
                onClick={() => handleExcluirImagem(item)}
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
