import { useQuery } from "@tanstack/react-query";

import { getIncidents } from "../services/incident.service";
import { incidentKeys } from "../utils/queryKeys";

export const useIncidents = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  severity = "",
  category = "",
  dateFrom = "",
  dateTo = "",
} = {}) => {
  const filters = { page, limit, search, status, severity, category, dateFrom, dateTo };

  return useQuery({
    queryKey: incidentKeys.list(filters),
    queryFn: () => getIncidents(filters),
    placeholderData: (previous) => previous,
  });
};
