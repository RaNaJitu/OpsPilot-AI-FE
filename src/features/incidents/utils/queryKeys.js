export const incidentKeys = {
  all: ["incidents"],
  lists: () => [...incidentKeys.all, "list"],
  list: (filters) => [...incidentKeys.lists(), filters],
  details: () => [...incidentKeys.all, "detail"],
  detail: (id) => [...incidentKeys.details(), id],
};
