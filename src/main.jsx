import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import Perfil from './pages/Perfil.jsx'
import Agenda from './pages/Agenda.jsx'
import Profissionais from './pages/Profissionais.jsx'
import HomeLogado from './pages/HomeLogado.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import PainelTatuador from './pages/PainelTatuador.jsx'
import Agendamento from './pages/Agendamento.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
      {
        path: "/profissionais",
        element: <Profissionais />,
      },
      {
        path: "/homelogado",
        element: <HomeLogado />,
      },
      {
        path: "/paineltatuador",
        element: <PainelTatuador />,
      },
      {
        path: "/agendamento",
        element: <Agendamento />,
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
