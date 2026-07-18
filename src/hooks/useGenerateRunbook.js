import { useMutation, useQueryClient } from "@tanstack/react-query";

import { generateIncidentRunbook } from "../services/incident.service";
import { normalizeRunbook } from "../features/incidents/utils/normalizeIncident";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useGenerateRunbook = (incidentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => generateIncidentRunbook(incidentId),
    onSuccess: (payload) => {
      const runbook = normalizeRunbook(payload?.data);
      if (!runbook) return;

      queryClient.setQueryData(incidentKeys.detail(incidentId), (previous) => {
        if (!previous?.data) return previous;
        return {
          ...previous,
          data: {
            ...previous.data,
            runbook,
          },
        };
      });

      queryClient.invalidateQueries({ queryKey: incidentKeys.detail(incidentId) });
    },
  });
};
