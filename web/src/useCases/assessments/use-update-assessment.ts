import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { assessmentsApi, type AssessmentPayload } from "@/services/assessments";
import { assessmentQueryKeys } from "./queryKeys";

export const useUpdateAssessment = (
  opt?: UseMutationOptions<
    Awaited<ReturnType<typeof assessmentsApi.update>>["data"],
    Error,
    { id: number; data: AssessmentPayload }
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => assessmentsApi.update(id, data).then((r) => r.data),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: assessmentQueryKeys.all });
      qc.invalidateQueries({ queryKey: assessmentQueryKeys.detail(vars.id) });
    },
    ...opt,
  });
};
