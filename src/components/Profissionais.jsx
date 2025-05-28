import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/profissionais.css";

const profissionais = [
  {
    nome: "Fulana da Silva",
    estilo: "blackwork",
    cidade: "Cascavel-PR",
    idade: 25,
    imagem: "/images/fulana.png",
    idusuario: 1,
  },
  {
    nome: "Fulano Matos",
    estilo: "realista",
    cidade: "Cascavel-PR",
    idade: 30,
    imagem: "/images/fulano.png",
    idusuario: 2,
  },
  {
    nome: "Joaquina Pão",
    estilo: "oldschool",
    cidade: "Cascavel-PR",
    idade: 28,
    imagem: "/images/joaquina.png",
    idusuario: 3,
  },
  {
    nome: "José Zé",
    estilo: "oriental",
    cidade: "Cascavel-PR",
    idade: 33,
    imagem: "/images/jose.png",
    idusuario: 4,
  },
  {
    nome: "Francisquinho",
    estilo: "anime/geek",
    cidade: "Cascavel-PR",
    idade: 36,
    imagem: "/images/francisquinho.png",
    idusuario: 5,
  },
];

export default function CatalogoProfissionais() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = React.useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % profissionais.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? profissionais.length - 1 : prev - 1
    );
  };

  const visible = profissionais.slice(startIndex, startIndex + 5);

  return (
    <section className="secao-profissionais" >
      <h2 className="titulo-profissionais">Conheça os brabos</h2>
      <div className="container-carrossel">
        <button
          className="botao-navegacao esquerdo"
          onClick={handlePrev}
        >
          <ChevronLeft className="icone-navegacao" />
        </button>

        <div className="lista-profissionais">
          {visible.map((prof) => (
            <div
              key={prof.idusuario}
              className="card-profissional"
            >
              <img
                src={prof.imagem}
                alt={prof.nome}
                className="foto-profissional"
              />
              <h3 className="nome-profissional">{prof.nome}</h3>
              <p className="info-profissional">
                tatuador(a) de estilo {prof.estilo}
                <br />
                {prof.cidade}
                <br />
                {prof.idade} anos.
              </p>
              <button
                onClick={() => navigate(`/profissionais/${prof.idusuario}`)}
                className="botao-detalhes"
              >
                CONHEÇA MAIS
              </button>
            </div>
          ))}
        </div>
        </div>
        <button
          className="botao-navegacao direito"
          onClick={handleNext}
        >
          <ChevronRight className="icone-navegacao" />
        </button>
    </section>
  );
}
