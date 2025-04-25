import api from './api'; // usa a instância com token

const API_URL = '/agendamento';
const ITENS_URL = '/itens';

export const listarAgendamentos = async () => {
  const resposta = await api.get(API_URL);
  return resposta.data;
};

export const buscarAgendamentoPorId = async (id) => {
  const resposta = await api.get(`${API_URL}/${id}`);
  return resposta.data;
};

export const salvarAgendamento = async (agendamento) => {
  const resposta = await api.post(API_URL, agendamento);
  return resposta.data;
};

export const atualizarAgendamento = async (id, agendamento) => {
  const resposta = await api.put(`${API_URL}/${id}`, agendamento);
  return resposta.data;
};

export const excluirAgendamento = async (id) => {
  const resposta = await api.delete(`${API_URL}/${id}`);
  return resposta.data;
};

export const excluirItemAgendamento = async (id) => {
  const resposta = await api.delete(`${ITENS_URL}/${id}`);
  return resposta.data;
};
