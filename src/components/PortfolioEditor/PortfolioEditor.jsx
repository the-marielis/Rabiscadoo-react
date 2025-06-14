import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import "./portfolioEditor.css";

const PortfolioEditor = ({ idusuario }) => {
  const [imagens, setImagens] = useState([]);
  const [novaImagem, setNovaImagem] = useState("");

  // Buscar imagens existentes
  useEffect(() => {
    if (idusuario) {
      axios
        .get(`http://localhost:3301/api/portfolio/${idusuario}`)
        .then((res) => setImagens(res.data))
        .catch((err) => console.error("Erro ao buscar portfólio:", err));
    }
  }, [idusuario]);

  // Adicionar imagem
  const handleAdicionarImagem = async (e) => {
    e.preventDefault();
    if (!novaImagem) return;

    try {
      const res = await axios.post(
        `http://localhost:3301/api/portfolio`,
        {
          idusuario: idusuario,
          imagem: novaImagem,
        }
      );
      setImagens((prev) => [...prev, res.data]);
      setNovaImagem("");
    } catch (err) {
      console.error("Erro ao adicionar imagem:", err);
    }
  };

  // Excluir imagem
  const handleExcluirImagem = async (idportfolio) => {
    try {
      await axios.delete(
        `http://localhost:3301/api/portfolio/${idportfolio}`
      );
      setImagens((prev) =>
        prev.filter((img) => img.idportfolio !== idportfolio)
      );
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
    }
  };

  return (
    <div className="portfolio-editor">
      <form onSubmit={handleAdicionarImagem} className="form-portfolio">
        <input
          type="text"
          placeholder="URL da imagem"
          value={novaImagem}
          onChange={(e) => setNovaImagem(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="lista-imagens">
        {imagens.length > 0 ? (
          imagens.map((img) => (
            <div key={img.idportfolio} className="imagem-item">
              <img src={img.imagem} alt="Portfólio" />
              <button
                className="btn-delete"
                onClick={() => handleExcluirImagem(img.idportfolio)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <p>Você ainda não adicionou imagens.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioEditor;
