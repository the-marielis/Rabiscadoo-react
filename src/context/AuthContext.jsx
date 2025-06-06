import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const buscarUsuario = async (idusuario) => {
    try {
      console.log(`Buscando dados do usuário com ID: ${idusuario}`);
      const response = await axios.get(
        `http://localhost:3301/api/usuario/${idusuario}`
      );
      console.log("Dados do usuário:", response.data);
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  useEffect(() => {
    const userSalvo = sessionStorage.getItem("user");
    if (userSalvo) {
      const userData = JSON.parse(userSalvo);
      const id = userData.user?.idusuario; 
      if (id) {
        buscarUsuario(id);
      } else {
        console.warn("ID do usuário não encontrado.");
      }
    }
  }, []);

const login = (dadosUsuario) => {
  sessionStorage.setItem("user", JSON.stringify(dadosUsuario));
  setUsuario(dadosUsuario.user); // Aqui garante que o estado pega só os dados do user
  buscarUsuario(dadosUsuario.user.idusuario); // Aqui busca o id certo
};


  const logout = () => {
    sessionStorage.removeItem("user");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
