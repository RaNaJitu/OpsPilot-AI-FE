import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardKeys } from "../../dashboard/utils/queryKeys";
import { analyzeIncident } from "../services/incident.service";
import { normalizeIncidentDetail } from "../utils/normalizeIncident";
import { incidentKeys } from "../utils/queryKeys";

export const useAnalyzeIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => analyzeIncident(id),
    onSuccess: (payload, id) => {
      if (payload?.data) {
        queryClient.setQueryData(
          incidentKeys.detail(id),
          normalizeIncidentDetail({ success: true, data: payload.data })
        );
      }
      queryClient.invalidateQueries({ queryKey: incidentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: incidentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
