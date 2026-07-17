import { useQuery } from "@tanstack/react-query";

import { getIncidents } from "../services/incident.service";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useIncidents = ({ page = 1, limit = 10, search = "" } = {}) => {
  return useQuery({
    queryKey: incidentKeys.list({ page, limit, search }),
    queryFn: () => getIncidents({ page, limit, search }),
    placeholderData: (previous) => previous,
  });
};
