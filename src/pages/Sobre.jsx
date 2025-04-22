import React from "react";
import "../main.css";

const Sobre = () => {
  return (
    <div className="sobre">
      <div className="sobre-texto">
        <h2>quem é a</h2>
        <h1>Rabiscadoo?</h1>
        <p>
          A Rabiscadoo é uma plataforma inovadora de agendamento de tatuagem, projetada para atender jovens e adultos que buscam a facilidade de se encher de rabiscos. Com uma extensa cartela de profissionais talentosos, oferecemos aos usuários a liberdade de escolher o tatuador e o estilo que melhor se adequa ao seu gosto, simplificando o processo de agendamento. Vale destacar que nossa responsabilidade se limita ao agendamento, garantindo uma experiência prática e sem complicações para os amantes da arte corporal.
        </p>
      </div>

      <img src="/images/mancha3.png" alt="mancha4" id="mancha-about" />
      <img src="/images/about.png" alt="about" id="about" />

      <div className="footer">
        <div>
          <h2>Contato</h2>
          <p>📞 (45) 99999-9999</p>
          <p>📬 Ouvidoria Rabiscadoo: 505</p>
          <p>✉️ contato@rabiscadoo.com</p>
        </div>
        <div>
          <h2>Nos acompanhe nas redes</h2>
          <p>Instagram: @Rabiscadoo.tattoo</p>
          <p>Facebook: Rabiscandoo</p>
          <p>Threads: Rabiscandoo</p>
        </div>
        <div>
          <img src="/images/complete-logo.png" alt="logo" style={{ width: "200px" }} />
        </div>
      </div>
    </div>
  );
};

export default Sobre;
