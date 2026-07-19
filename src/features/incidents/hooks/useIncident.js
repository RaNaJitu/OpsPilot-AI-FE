import { useQuery } from "@tanstack/react-query";

import { getIncidentById } from "../services/incident.service";
import { normalizeIncidentDetail } from "../utils/normalizeIncident";
import { incidentKeys } from "../utils/queryKeys";

export const useIncident = (id, options = {}) => {
  return useQuery({
    queryKey: incidentKeys.detail(id),
    queryFn: async () => normalizeIncidentDetail(await getIncidentById(id)),
    enabled: Boolean(id),
    ...options,
  });
};
