import React from 'react';
import '../css/main.css';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;  
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redireciona pra home depois de sair
  };

  return ( 
    <nav>
      <Link to="/" className={currentPath === "/" ? "ativo" : ""}>HOME</Link>
      <Link to="/profissionais" className={currentPath === "/profissionais" ? "ativo" : ""}>PROFISSIONAIS</Link>
      <Link to="/agenda" className={currentPath === "/agenda" ? "ativo" : ""}>AGENDE JÁ</Link>
      <Link to="/sobre" className={currentPath === "/sobre" ? "ativo" : ""}>
        QUEM SOMOS
       
      </Link>

      {usuario ? (
        <>
          <Link to="/perfil" id="perfil" className={currentPath === "/perfil" ? "ativo" : ""}>
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
        <Link to="/login" id="entrar" className={currentPath === "/login" ? "ativo" : ""}>
          <img src="/images/profile2.png" alt="profile" style={{ width: "auto", height: "19px", marginRight: "7%" }} />
          ENTRAR
        </Link>
      )}
    </nav>
  );
};

export default Nav;
