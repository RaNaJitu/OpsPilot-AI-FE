import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteIncident } from "../services/incident.service";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useDeleteIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteIncident(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: incidentKeys.lists() });
      queryClient.removeQueries({ queryKey: incidentKeys.detail(id) });
    },
  });
};
