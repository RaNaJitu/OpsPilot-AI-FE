export const chatKeys = {
  all: ["incident-chat"],
  history: (incidentId) => [...chatKeys.all, "history", incidentId],
};
