import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '././css/main.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Cadastro from './components/Cadastro.jsx';
import Home from './components/Home.jsx';
import Sobre from './components/Sobre.jsx';
import Perfil from './components/Perfil.jsx';
import Agenda from './components/Agenda.jsx';
import Profissionais from './components/Profissionais.jsx';
import HomeLogado from './components/HomeLogado.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import PainelTatuador from './components/PainelTatuador.jsx';
import Agendamento from './components/Agendamento.jsx';

import { AuthProvider } from './context/AuthContext.jsx'; // importa o context novo

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/login", element: <Login /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/agenda", element: <Agenda /> },
      { path: "/profissionais", element: <Profissionais /> },
      { path: "/homelogado", element: <HomeLogado /> },
      { path: "/paineltatuador", element: <PainelTatuador /> },
      { path: "/agendamento", element: <Agendamento /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* envolve TUDO com o AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
