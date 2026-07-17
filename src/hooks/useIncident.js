import { useQuery } from "@tanstack/react-query";

import { getIncidentById } from "../services/incident.service";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useIncident = (id, options = {}) => {
  return useQuery({
    queryKey: incidentKeys.detail(id),
    queryFn: () => getIncidentById(id),
    enabled: Boolean(id),
    ...options,
  });
};
