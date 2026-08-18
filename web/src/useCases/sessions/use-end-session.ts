import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { sessionsApi } from "@/services/sessions";
import { sessionQueryKeys } from "./queryKeys";

export const useEndSession = (
  opt?: UseMutationOptions<Awaited<ReturnType<typeof sessionsApi.endSession>>["data"], Error, { id: number; reason?: string }>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }) => sessionsApi.endSession(id, reason).then((r) => r.data),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: sessionQueryKeys.detail(vars.id) });
    },
    ...opt,
  });
};
