import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardKeys } from "../../dashboard/utils/queryKeys";
import { uploadIncident } from "../services/incident.service";
import { incidentKeys } from "../utils/queryKeys";

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
