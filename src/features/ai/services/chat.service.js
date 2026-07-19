import api from "../../../services/api";

export const getIncidentChat = async (id) => {
  const response = await api.get(`/incidents/${id}/chat`);
  return response.data;
};

export const sendIncidentChatMessage = async (id, message) => {
  const response = await api.post(`/incidents/${id}/chat`, { message });
  return response.data;
};

export const clearIncidentChat = async (id) => {
  const response = await api.delete(`/incidents/${id}/chat`);
  return response.data;
};
