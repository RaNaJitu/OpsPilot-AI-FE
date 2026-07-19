import { toast } from "sonner";

export const appToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.message(message),
};
