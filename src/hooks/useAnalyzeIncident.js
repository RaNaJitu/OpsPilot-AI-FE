import { useMutation, useQueryClient } from "@tanstack/react-query";

import { analyzeIncident } from "../services/incident.service";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useAnalyzeIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => analyzeIncident(id),
    onSuccess: (payload, id) => {
      if (payload?.data) {
        queryClient.setQueryData(incidentKeys.detail(id), {
          success: true,
          data: payload.data,
        });
      }
      queryClient.invalidateQueries({ queryKey: incidentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: incidentKeys.lists() });
    },
  });
};
