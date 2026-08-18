import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { sessionsApi } from "@/services/sessions";
import { sessionQueryKeys } from "./queryKeys";

export const useMarkPortfolioReviewed = (
  opt?: UseMutationOptions<Awaited<ReturnType<typeof sessionsApi.markPortfolioReviewed>>["data"], Error, number>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => sessionsApi.markPortfolioReviewed(id).then((r) => r.data),
    onSuccess: (_d, id) => {
      qc.invalidateQueries({ queryKey: sessionQueryKeys.portfolio(id) });
    },
    ...opt,
  });
};
