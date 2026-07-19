import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  clearIncidentChat,
  getIncidentChat,
  sendIncidentChatMessage,
} from "../services/chat.service";
import { chatKeys } from "../utils/queryKeys";

export const useIncidentChatHistory = (incidentId) => {
  return useQuery({
    queryKey: chatKeys.history(incidentId),
    queryFn: () => getIncidentChat(incidentId),
    enabled: Boolean(incidentId),
  });
};

export const useSendIncidentChat = (incidentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message) => sendIncidentChatMessage(incidentId, message),
    onSuccess: (payload) => {
      const key = chatKeys.history(incidentId);
      const nextMessages = payload?.data?.messages ?? [];

      queryClient.setQueryData(key, (previous) => {
        const existing = previous?.data ?? [];
        return {
          success: true,
          data: [...existing, ...nextMessages],
        };
      });
    },
  });
};

export const useClearIncidentChat = (incidentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearIncidentChat(incidentId),
    onSuccess: () => {
      queryClient.setQueryData(chatKeys.history(incidentId), {
        success: true,
        data: [],
      });
    },
  });
};
