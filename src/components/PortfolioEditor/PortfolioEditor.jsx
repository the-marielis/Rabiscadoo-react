import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import "./portfolioEditor.css";

const PortfolioEditor = ({ idusuario }) => {
  const [imagens, setImagens] = useState([]);
  const [novaImagem, setNovaImagem] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const inputFileRef = useRef(null);
  

  const [formData, setFormData] = useState({
   url_imagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Buscar imagens existentes
  useEffect(() => {
    if (idusuario) {
      axios
        .get(`http://localhost:3301/api/portfolio/${idusuario}`)
        .then((res) => setImagens(res.data))
        .catch((err) => console.error("Erro ao buscar portfólio:", err));
    }
  }, [idusuario]);

  const handleArquivoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivo(file);
      setNomeArquivo(file.name);
      formData.url_imagem = URL.createObjectURL(file);
      // setPreview(imageURL);
    }
    nomeArquivo;
  };
  // const handleIconClick = () => {
  //   if (inputFileRef.current) {
  //     inputFileRef.current.click();
  //   }
  // };

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



  const adicionaImagem = async () => {
    // Se for URL
    if (formData.url_imagem.trim() !== "") {
      console.log("Entrou aqui")

      try {
        const res = await axios.post("http://localhost:3301/api/portfolio", {
          idtatuador: idusuario,
          descricao: "Imagem por URL",
          imagem: formData.url_imagem,
        });
        setImagens((prev) => [...prev, res.data]);
        setFormData({ url_imagem: "" });
      } catch (err) {
        console.error("Erro ao enviar imagem por URL:", err);
      }
    }
    // Se for upload de arquivo
    else if (arquivo) {
      const fd = new FormData();
      fd.append("arquivo", arquivo);
      fd.append("idtatuador", idusuario);
      fd.append("descricao", "Imagem enviada por upload");

      try {
        const res = await axios.post("http://localhost:3301/api/portfolio", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImagens((prev) => [...prev, res.data]);

        setArquivo(null);
      } catch (err) {
        console.error("Erro ao enviar imagem por upload:", err);
      }
    }
    // Se nenhum dos dois foi preenchido
    else {
      if (inputFileRef.current) {
        inputFileRef.current.click(); // abre seleção de imagem
      }
    }
  };


  return (
    <div className="portfolio-editor">
      <form onSubmit={handleAdicionarImagem} className="form-portfolio">
        <input
          type="text"
          name={"url_imagem"}
          placeholder="URL da imagem"
          value={formData.url_imagem}
          onChange={handleChange}
        />
        <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleArquivoChange}
        />
        <button type="button" onClick={adicionaImagem}>Adicionar</button>

      </form>

      <div className="lista-imagens">
        {imagens.length > 0 ? (
          imagens.map((img) => (
            <div key={img.idportfolio} className="imagem-item">
                    <img src={img.imagem} alt="Portfólio" />
                    {/*<img src={formData.url_imagem} alt="Portfólio" />*/}
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
