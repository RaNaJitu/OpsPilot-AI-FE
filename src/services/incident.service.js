import api from "./api";

export const uploadIncident = async (formData, onUploadProgress) => {
  const response = await api.post("/incidents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return response.data;
};

export const getIncidents = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  severity = "",
  category = "",
  dateFrom = "",
  dateTo = "",
} = {}) => {
  const response = await api.get("/incidents", {
    params: {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(status ? { status } : {}),
      ...(severity ? { severity } : {}),
      ...(category ? { category } : {}),
      ...(dateFrom ? { dateFrom } : {}),
      ...(dateTo ? { dateTo } : {}),
    },
  });

  return response.data;
};

export const getIncidentById = async (id) => {
  const response = await api.get(`/incidents/${id}`);
  return response.data;
};

export const deleteIncident = async (id) => {
  const response = await api.delete(`/incidents/${id}`);
  return response.data;
};

export const analyzeIncident = async (id) => {
  const response = await api.post(`/incidents/${id}/analyze`);
  return response.data;
};

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

export const generateIncidentRunbook = async (id) => {
  const response = await api.post(`/incidents/${id}/runbook`);
  return response.data;
};
