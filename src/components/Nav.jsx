import React from 'react';
import '../main.css';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redireciona pra home depois de sair
  };

  return ( 
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/profissionais">PROFISSIONAIS</Link>
      <Link to="/agenda">AGENDE JÁ</Link>
      <Link to="/sobre">
        QUEM SOMOS
        <img src="/images/seta.png" alt="seta" style={{ width: "auto", height: "15px", marginLeft: "5%" }} />
      </Link>

      {usuario ? (
        <>
          <Link to="/perfil" id="perfil">
            <img src="/images/profile2.png" alt="profile" style={{ width: "auto", height: "19px", marginRight: "7%" }} />
            MEU PERFIL
          </Link>

          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline"
            }}
          >
            SAIR
          </button>
        </>
      ) : (
        <Link to="/login" id="entrar">
          <img src="/images/profile2.png" alt="profile" style={{ width: "auto", height: "19px", marginRight: "7%" }} />
          ENTRAR
        </Link>
      )}
    </nav>
  );
};

export default Nav;
