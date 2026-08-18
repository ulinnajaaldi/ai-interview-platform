import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { assessmentsApi } from "@/services/assessments";
import { assessmentQueryKeys } from "./queryKeys";

export const useDeleteAssessment = (
  opt?: UseMutationOptions<void, Error, number>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => assessmentsApi.delete(id).then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: assessmentQueryKeys.all }),
    ...opt,
  });
};
