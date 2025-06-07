import React from "react";
import '../css/perfilUsuario.css';
const Perfil = () => {
    return (
        <div className="perfil-container">
            <div className="perfil-content">
            <h1>Sua conta</h1>
            <div className="perfil-info1">
                <h3>Nome:</h3>
                <p className="perfil-info">Email:</p>
                <p className="perfil-info">Telefone:</p>
                <p className="perfil-info">Data de nascimento:</p>
            </div>
            <div className="perfil-info2">
                <h3>Históricos:</h3>
                <p className="perfil-info">Pedidos finalizados</p>
                <p className="perfil-info">Suas avaliações</p>
                <p className="perfil-info">Chats arquivados</p>
            </div>
            <div className="perfil-info3">
                <h3>Privacidade e Segurança:</h3>
                <p className="perfil-info">Alterar senha</p>
                <p className="perfil-info">Mudar para perfil profissional</p>
                <p className="perfil-info">Alterar preferências da conta</p>
                <p className="perfil-info">Ocultar pessoas</p>
                <p className="delete">Deletar conta</p>
            </div>
            <div className="perfil-info4">
                <h3>Preferências:</h3>
                <p className="perfil-info">Armazenamento</p>
                <p className="perfil-info">Notificações</p>
                <p className="perfil-info">Sobre a Rabiscadoo</p>
                <p className="perfil-info">v.0.0.1/2024</p>
            </div>
            </div>
        </div>
    );
};

export default Perfil;