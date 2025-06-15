//import React, {useState} from "react";
import {GoGear, GoHistory, GoPencil} from "react-icons/go";
import "../css/perfilUsuario.css";
import BotaoContinuar from "./BotaoContinuar";
import {useAuth} from "../context/AuthContext";
import HistoricoList from "../components/HistoricoList/HistoricoList";
import PortfolioCarousel from "../components/Carousel/PortfolioCarousel";
import PortfolioEditor from "../components/PortfolioEditor/PortfolioEditor.jsx";
import {useNavigate} from "react-router-dom";
import Toast from "./Toast/Toast.jsx";
import React, {useEffect, useRef, useState} from "react";
import {converteDataUsa} from "../Utils/converteData.js";
import BotaoDeletarConta from "../components/BotaoDeletarConta/BotaoDeletarConta.jsx";


const HomeLogado = () => {
  const navigate = useNavigate();
  const [toast, setToast]  = useState(null);
  const { usuario } = useAuth();
  const [editando, setEditando] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const inputFileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    idususario:"",
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    avatar: null,
    senha:"",
    tp_cadastro: "",
    editouConfig: false,
    idTatuador: "",
    descricao: "",
    imagem: "",
    instagram: "",
    portifolio_url:"",
  });


  // Atualiza formData quando usuario for carregado
  useEffect(() => {
    if (usuario) {
      setFormData({
        idusuario: usuario.idusuario || "",
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        nascimento: converteDataUsa(usuario.nascimento) || "",
        avatar: usuario.avatar || null,
        senha: usuario.senha || "",
        tp_cadastro: usuario.tp_cadastro || "",
        editouConfig: false,
        idTatuador:usuario.idTatuador || "",
        descricao:usuario.descricao || "",
        imagem: usuario.imagem || "",
        instagram: usuario.instagram || "",
        portifolio_url: usuario.portifolio_url || "",
      });
    }
  }, [usuario]);

  const showToast = (message, type = "error") => setToast({ message, type });
  const toggleEdicao = () => setEditando(!editando);
  const toggleConfiguracao = () => setConfigurando(!configurando);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // <== Simula clique no input file
    }
  };

  const handleArquivoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivo(file);
      setNomeArquivo(file.name);
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
    nomeArquivo;
  };

  const SalvaAvatar = async () => {
    const form = new FormData();

    form.append("avatar", arquivo);
    form.append("idusuario", usuario?.idusuario);

    try {
      const response = await fetch("http://localhost:3301/api/avatar", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      console.log(data);
      await buscarUsuario(usuario?.idusuario); // Atualiza o contexto
      showToast("Avatar salvo com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao enviar avatar:", error);
      showToast("Erro ao salvar avatar", "error");
    }
  };

  return (
      <>
        {toast && (
            <div className="toast-container">
              <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            </div>
        )}

    <div
      className="perfil-container"
      style={{ backgroundImage: "url('/images/BACKGROUND_LOGIN.png')" }}
    >
      <section className="perfil-card">
        <h1 className="perfil-title">Seu espaço</h1>

        <div className="perfil-grid">
          <article className="perfil-box info-principal">
            <div className="avatar-tatu"
                 onClick={handleIconClick}
                 style={{
                   cursor: "pointer",
                   position: "relative",
                   overflow: "hidden",
                 }}>

              {preview || formData.imagem ? (
                  <img
                      src={
                          preview ||
                          (formData.imagem
                              // ? `http://localhost:3301/${formData.imagem}`
                              ? `http://localhost:5173/images/fulana.png`
                              : "/images/default-avatar.png")
                      }
                      alt=""
                      className="avatar-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                  />
              ) : null}

              <GoPencil className="avatar-tatu-pencil" />
              <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleArquivoChange}
              />
            </div>

            {/* Ícone/avatar + dados */}

            <div className="dados">
              <div className="linha-nome">
                <h2>{usuario?.nome || "Nome do Tatuador"}</h2>
                <GoPencil />
              </div>
              <p>{usuario?.email || "email@email.com"}</p>
              <p>Telefone: {usuario?.telefone || "Não informado"}</p>
              <p>Data de nascimento: {usuario?.nascimento || "00/00/0000"}</p>
              <div className="linha-informacoes">
                <div className="linha-historicos">
                  <h3>Históricos</h3>
                  <GoHistory />
                </div>
                <HistoricoList papel="tatuador" scope="todos" />
                <div className="linha-privacidade">
                  <h3>Privacidade e Segurança</h3>
                  <GoGear />
                </div>
                <p>Alterar senha</p>
                <p>Mudar para perfil profissional</p>
                <p>Alterar preferências da conta</p>
                <p>Ocultar pessoas</p>
                <BotaoDeletarConta
                    idusuario={usuario?.idusuario}
                    idTatuador={usuario?.idTatuador}
                    showToast={showToast}
                />
              </div>
            </div>
          </article>

          <article className="perfil-box agendamentos">
            <div className="linha-agendas">
              <h3>Próximos Agendamentos</h3>
            </div>
            <div>
            <HistoricoList papel="tatuador" scope="proximos" />
            </div>
<div className="portfolio">
  <div className="linha-portfolio">
    <h3>Portfólio</h3>
    <GoPencil />
  </div>

  <PortfolioCarousel
    idusuario={usuario?.idusuario}
    imagensPorPagina={3}
    modoCompacto={true}
  />
  <PortfolioEditor idusuario={usuario?.idusuario} />
</div>

          </article>
          <br />
        </div>
        <BotaoContinuar texto="confirmar" largura="35%" />
      </section>
    </div>
   </>
  );
};

export default HomeLogado;
