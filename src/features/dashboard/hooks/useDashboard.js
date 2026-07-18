import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../../../services/dashboard.service";
import { dashboardKeys } from "../utils/queryKeys";

export const useDashboard = () => {
  return useQuery({
    queryKey: dashboardKeys.detail(),
    queryFn: getDashboard,
  });
};
