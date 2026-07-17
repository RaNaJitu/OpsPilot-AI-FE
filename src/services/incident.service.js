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

export const getIncidents = async ({ page = 1, limit = 10, search = "" } = {}) => {
  const response = await api.get("/incidents", {
    params: {
      page,
      limit,
      ...(search ? { search } : {}),
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
