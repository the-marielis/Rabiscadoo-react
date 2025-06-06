import React from 'react';
import '../css/main.css';
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from './Dropdown/UserDropdown';

const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { usuario } = useAuth();




  return (
    <nav>
      <Link to="/" className={currentPath === "/" ? "ativo" : ""}>HOME</Link>
      <Link to="/profissionais" className={currentPath === "/profissionais" ? "ativo" : ""}>PROFISSIONAIS</Link>
      <Link to="/agenda" className={currentPath === "/agenda" ? "ativo" : ""}>AGENDE JÁ</Link>
      <Link to="/sobre" className={currentPath === "/sobre" ? "ativo" : ""}>QUEM SOMOS</Link>

      {usuario ? (
          <UserDropdown />
      ) : (
        <Link to="/login" id="entrar" className={currentPath === "/login" ? "ativo" : ""}>
          <img src="/images/profile2.png" alt="profile" style={{ height: "19px", marginRight: "7%" }} />
          ENTRAR
        </Link>
      )}
    </nav>
  );
};

export default Nav;
