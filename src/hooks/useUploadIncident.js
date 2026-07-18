import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadIncident } from "../services/incident.service";
import { dashboardKeys } from "../features/dashboard/utils/queryKeys";
import { incidentKeys } from "../features/incidents/utils/queryKeys";

export const useUploadIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, onUploadProgress }) =>
      uploadIncident(formData, onUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: incidentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
