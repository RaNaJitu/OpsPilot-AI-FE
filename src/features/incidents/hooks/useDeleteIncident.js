import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardKeys } from "../../dashboard/utils/queryKeys";
import { deleteIncident } from "../services/incident.service";
import { incidentKeys } from "../utils/queryKeys";

export const useDeleteIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteIncident(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: incidentKeys.lists() });
      queryClient.removeQueries({ queryKey: incidentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
