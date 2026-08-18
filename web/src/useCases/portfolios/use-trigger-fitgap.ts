import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { portfoliosApi } from "@/services/portfolios";
import { portfolioQueryKeys } from "./queryKeys";

export const useTriggerFitGap = (
  opt?: UseMutationOptions<
    Awaited<ReturnType<typeof portfoliosApi.triggerFitGap>>["data"],
    Error,
    { portfolioId: number; vacancyId: number }
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ portfolioId, vacancyId }) =>
      portfoliosApi.triggerFitGap(portfolioId, vacancyId).then((r) => r.data),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({
        queryKey: portfolioQueryKeys.fitGap(vars.portfolioId, vars.vacancyId),
      });
    },
    ...opt,
  });
};
