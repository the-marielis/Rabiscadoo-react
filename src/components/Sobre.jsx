import React from "react";
import "../css/main.css";

const Sobre = () => {
  return (
    <>
      <div className="sobre">
        <div className="sobre-texto">
          <h2>quem é a</h2>
          <h1>Rabiscadoo?</h1>
          <p>
            A Rabiscadoo é uma plataforma inovadora de agendamento de tatuagem,
            projetada para atender jovens e adultos que buscam a facilidade de
            se encher de rabiscos. Com uma extensa cartela de profissionais
            talentosos, oferecemos aos usuários a liberdade de escolher o
            tatuador e o estilo que melhor se adequa ao seu gosto, simplificando
            o processo de agendamento. Vale destacar que nossa responsabilidade
            se limita ao agendamento, garantindo uma experiência prática e sem
            complicações para os amantes da arte corporal.
          </p>
        </div>

        <img src="/images/mancha3.png" alt="mancha4" id="mancha-about" />
        <img src="/images/about.png" alt="about" id="about" />
      </div>

      {/* Footer fora da div.sobre */}
      <div className="footer">
        <div>
          <h2>Contato</h2>
          <p>
            <img src="/images/icon-whats.png" alt="whatsapp" /> (45) 99999-9999
          </p>
          <p>
            <img src="/images/icon-tel.png" alt="telefone" /> Ouvidoria
            Rabiscadoo: 505
          </p>
          <p>
            <img src="/images/icon-email.png" alt="email" />{" "}
            contato@rabiscadoo.com
          </p>
        </div>
        <div>
          <h2>Nos acompanhe nas redes</h2>
          <p>
            <img src="/images/icon-instagram.png" alt="instagram" />{" "}
            @Rabiscadoo.tattoo
          </p>
          <p>
            <img src="/images/icon-face.png" alt="facebook" /> Rabiscandoo
          </p>
          <p> 
            <img src="/images/icon-github.png" alt="github" />Rabiscandoo
            </p>
        </div>
        <div className="footer-logo">
          <img src="/images/complete-logo.png" alt="logo" />
        </div>
      </div>
      <div className="copyright">
        <p>© 2024 RABISCADOO. All rights reserved</p>
      </div>
    </>
  );
};

export default Sobre;
