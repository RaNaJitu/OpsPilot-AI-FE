import { useMutation, useQueryClient } from "@tanstack/react-query";

import { analyzeIncident } from "../services/incident.service";
import { dashboardKeys } from "../features/dashboard/utils/queryKeys";
import { normalizeIncidentDetail } from "../features/incidents/utils/normalizeIncident";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useAnalyzeIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => analyzeIncident(id),
    onSuccess: (payload, id) => {
      if (payload?.data) {
        // Analyze returns a flat incident; detail GET returns nested shape.
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
