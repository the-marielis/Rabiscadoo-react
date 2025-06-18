import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import "./portfolioEditor.css";

const PortfolioEditor = ({ idusuario }) => {
  const [imagens, setImagens] = useState([]);
  const [toast, setToast] = useState(null);
  const [novaImagem, setNovaImagem] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const inputFileRef = useRef(null);
  const showToast = (message, type = "error") => setToast({ message, type });
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({url_imagem: "",});

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

      const urlPreview = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, { src: urlPreview, tipo: "upload", arquivo: file }]);
      setFormData((prev) => ({ ...prev, url_imagem: "" }));
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

  const removerPreview = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validaInputImagem = () => {
    if (formData.url_imagem.trim() === "") {
      inputFileRef.current.click();
    } else {
      setPreviews((prev) => [...prev, { src: formData.url_imagem, tipo: "url" }]);
      setFormData((prev) => ({ ...prev, url_imagem: "" }));
    }
  };

  const adicionaImagem = async () => {
    for (const preview of previews) {
      if (preview.tipo === "url") {
        try {
          const res = await axios.post("http://localhost:3301/api/portfolio", {
            idtatuador: idusuario,
            descricao: "Imagem por URL",
            imagem: preview.src,
          });
          setImagens((prev) => [...prev, res.data]);
        } catch (err) {
          console.error("Erro ao enviar imagem por URL:", err);
        }
      } else if (preview.tipo === "upload") {
        const fd = new FormData();
        fd.append("arquivo", preview.arquivo);
        fd.append("idtatuador", idusuario);
        fd.append("descricao", "Imagem enviada por upload");

        try {
          const res = await axios.post("http://localhost:3301/api/portfolio", fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setImagens((prev) => [...prev, res.data]);
        } catch (err) {
          console.error("Erro ao enviar imagem por upload:", err);
        }
      }
    }

    setPreviews([]);
    showToast("Imagens salvas com sucesso!", "success");
  };


  return (
    <div className="portfolio-editor">
      <form  className="form-portfolio">
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
        <button type="button" onClick={validaInputImagem}>preview</button>
        <button type="button" onClick={adicionaImagem}>adicionar</button>

      </form         >

      <div className="lista-imagens">
        {previews.map((preview, index) => (
            <div key={index} className="imagem-item preview-item">
              <img src={preview.src} alt="Preview da imagem" />
              <button className="btn-delete" onClick={() => removerPreview(index)}>
                <Trash2 size={18} />
              </button>
            </div>
        ))}

      </div>
    </div>
  );
};

export default PortfolioEditor;
