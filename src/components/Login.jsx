import React, { useState }from "react";
import "../main.css";
import axios from '../axiosConfig';

 

const Login = () => {
  const [nome_usuario, setNome_usuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia o e-mail e senha para o backend
      const response = await axios.post('api/cadastrologin', {
        nome_usuario,
        password,
      });
      console.log(response.data);
      alert('Login realizado com sucesso!');
      // Aqui você pode adicionar a lógica para redirecionar o usuário para outra página
    } catch (err) {
      // Se ocorrer um erro (usuário não encontrado ou senha incorreta)
      console.error(err);
      setError('Erro ao fazer login: ' + err.response?.data || 'Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
      <div
        className="container-login100"
        style={{ backgroundImage: "url('./public/images/BACKGROUND_LOGIN.png')" }}
      >
        <nav>
          <a href="#">HOME</a>
          <a href="#">PROFISSIONAIS</a>
          <a href="#">AGENDE JÁ</a>
          <a href="#">
            QUEM SOMOS
            <img src="/images/seta.png" alt="seta" style={{ width: "auto", height: "15px", marginLeft: "5%" }} />
          </a>
          <a href="#" id="entrar">
            <img src="/images/profile2.png" alt="profile" style={{ width: "auto", height: "19px", marginRight: "7%" }} />
            ENTRAR
          </a>
        </nav>

        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
          <form className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title p-b-53">Faça seu login</span>

            <div className="container-btn">
              <a href="#" className="btn-face m-b-20">
                <i className="fa fa-facebook-official"></i> Facebook
              </a>
              <a href="#" className="btn-google m-b-20">
                <img src="/images/icons/icon-google.png" alt="GOOGLE" /> Google
              </a>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Username is required"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  padding: "0",
                  height: "50px",
                  width: "25px",
                }}
              >
                <img src="./public/images/profile.png" alt="profile" style={{ height: "100%", width: "auto" }} />
              </div>
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Digite seu e-mail"
                style={{ flex: 1, border: "none", outline: "none", backgroundColor: "#fff", paddingLeft: "10px" }}
                value={nome_usuario}
                onChange={(e) => setNome_usuario(e.target.value )} required // Captura do valor de e-mail
              />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required" style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "0",
                  height: "50px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <img src="./public/images/cadeado.png" alt="cadeado" style={{ height: "100%", width: "auto" }} />
              </div>
              <input className="input100" type="password" name="pass" placeholder="Digite sua senha" style={{ flex: 1, border: "none" }} 
              value={password}
              onChange={(e) => setPassword(e.target.value)} required // Captura do valor de senha
              />
            </div>

            <div>
              <span className="lembrar">
                <br />
                <input type="checkbox" id="lembre" name="lembre" value="Lembre-se de mim" /> Lembre-se de mim
              </span>
            </div>

            <div className="container-login100-form-btn m-t-17">
            {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit" disabled={loading} onClick={handleSubmit} className="login100-form-btn"> {loading ? 'Carregando...' : 'login' } </button>
            </div>

            <div className="w-full text-center p-t-55">
              <span className="txt2">Novo por aqui? </span>
              <div className="newUser">
                <a href="#" className="txt2 bo1">
                   Crie uma conta
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
