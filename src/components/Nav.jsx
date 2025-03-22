import React from 'react';
import '../main.css';
import { Link } from "react-router-dom";

const Nav = () => {
   return ( 
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/profissionais">PROFISSIONAIS</Link>
        <Link to="/agenda">AGENDE JÁ</Link>
        <Link to="/sobre">
          QUEM SOMOS
          <img src="/images/seta.png" alt="seta" style={{ width: "auto", height: "15px", marginLeft: "5%" }} />
        </Link>
        <Link to="/login" id="entrar">
          <img src="/images/profile2.png" alt="profile" style={{ width: "auto", height: "19px", marginRight: "7%" }} />
          ENTRAR
        </Link>
      </nav>
   )

}
export default Nav;