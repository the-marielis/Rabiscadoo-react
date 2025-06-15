// src/components/BotaoDeletarConta.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {logout} from "../../services/auth.js";

const BotaoDeletarConta = ({ idusuario, idTatuador, showToast }) => {
    const navigate = useNavigate();

    const deletarConta = async () => {
        let confirmar = window.confirm("Tem certeza que deseja deletar sua conta?");
        if (!confirmar) return;
        confirmar = window.confirm("Tem certeza MESMO?");
        confirmar = window.confirm("Tem certeza? Faz isso comigo não pufavo");
        if (!confirmar) return;

        try {
            const response = await axios.post("http://localhost:3301/api/usuario/deletar", {
                idusuario,
                idTatuador,
            });

            console.log(response.data);
            showToast("⚠️ USUÁRIO Deletado ⚠️", "success");
            setTimeout(() => {
                logout();
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            showToast("Erro ao deletar sua conta", "error");
        }
    };

    return (
        <p className="delete" onClick={deletarConta}>
            <br />
            Deletar conta
        </p>
    );
};

export default BotaoDeletarConta;
