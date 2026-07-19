import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../services/auth.service";
import { profileKeys } from "../utils/queryKeys";

export const useProfile = (options = {}) => {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: async () => {
      const { data } = await getProfile();
      return data?.data?.user ?? null;
    },
    ...options,
  });
};
