import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { sessionsApi } from "@/services/sessions";
import { sessionQueryKeys } from "./queryKeys";

export const useRegeneratePortfolio = (
  opt?: UseMutationOptions<Awaited<ReturnType<typeof sessionsApi.regeneratePortfolio>>["data"], Error, number>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => sessionsApi.regeneratePortfolio(id).then((r) => r.data),
    onSuccess: (_d, id) => {
      qc.invalidateQueries({ queryKey: sessionQueryKeys.portfolio(id) });
    },
    ...opt,
  });
};
