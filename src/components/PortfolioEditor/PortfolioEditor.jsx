// src/components/PortfolioEditor.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const PortfolioEditor = ({ idusuario }) => {
  const [imagens, setImagens] = useState([]);
  const [novaImagem, setNovaImagem] = useState("");

  useEffect(() => {
    buscarImagens();
  }, [idusuario]);

  const buscarImagens = () => {
    axios.get(`/api/portfolio/${idusuario}`).then((res) => {
      setImagens(res.data);
    });
  };

  const handleAdicionar = () => {
    if (!novaImagem.trim()) return;

    axios
      .post("/api/portfolio", { idusuario, imagem: novaImagem })
      .then(() => {
        buscarImagens();
        setNovaImagem("");
      })
      .catch((err) => console.error(err));
  };

  const handleRemover = (imagem) => {
    axios
      .delete("/api/portfolio", { data: { idusuario, imagem } })
      .then(() => buscarImagens())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="URL da imagem"
          value={novaImagem}
          onChange={(e) => setNovaImagem(e.target.value)}
          style={{ width: "70%" }}
        />
        <button onClick={handleAdicionar}>Adicionar</button>
      </div>

      <div className="portfolio-grid">
        {imagens.map((img, idx) => (
          <div key={idx} className="imagem-item" style={{ marginBottom: "1rem" }}>
            <img src={img.imagem} alt="img" width={120} />
            <button onClick={() => handleRemover(img.imagem)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioEditor;
