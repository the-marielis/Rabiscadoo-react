import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./UserDropdown.css";

const UserDropdown = () => {
  const { usuario, logout } = useAuth();
  const [aberto, setAberto] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setAberto(!aberto);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fecharMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAberto(false);
      }
    };
    document.addEventListener("mousedown", fecharMenu);
    return () => document.removeEventListener("mousedown", fecharMenu);
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button onClick={toggleMenu} className="perfil-btn">
        <img src="/images/profile2.png" alt="perfil" className="icon" />
        MEU PERFIL
        <img src="/images/seta.png" alt="seta" className="icon" />
      </button>

      {aberto && (
        <div className="dropdown-menu">
          <p className="saudacao">Olá, {usuario?.nome || "usuário"}!</p>
          <ul>
            <li><Link to="/chats">Seus chats</Link></li>
            <li><Link to="/avaliacoes">Suas avaliações</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
            <li><Link to="/seguranca">Sua segurança</Link></li>
            <li><Link to="/ajuda">Precisa de ajuda?</Link></li>
            <li><Link to="/dados">Atualizar dados pessoais</Link></li>
            <li><Link to="/configuracoes">Preferências e configurações</Link></li>
          </ul>

          <hr className="divider" />

          <button className="sair-btn" onClick={handleLogout}>
            <img src="/images/logout-icon.png" alt="logout" className="logout-icon" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
