import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { logout } from "../services/auth.service";
import { profileKeys } from "../utils/queryKeys";
import { appToast } from "../../../utils/toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutUser = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      appToast.success("Signed out");
    } catch {
      // Session may already be invalid — still clear local state.
    } finally {
      queryClient.removeQueries({ queryKey: profileKeys.all });
      navigate("/", { replace: true });
      setIsLoggingOut(false);
    }
  };

  return { logoutUser, isLoggingOut };
};
