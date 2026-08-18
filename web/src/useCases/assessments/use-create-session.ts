import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { assessmentsApi } from "@/services/assessments";
import { assessmentQueryKeys } from "./queryKeys";

export const useCreateSession = (
  opt?: UseMutationOptions<
    Awaited<ReturnType<typeof assessmentsApi.createSession>>["data"],
    Error,
    { assessmentId: number; candidateName?: string; candidateId?: number }
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ assessmentId, candidateName, candidateId }) =>
      assessmentsApi.createSession(assessmentId, candidateName, candidateId).then((r) => r.data),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: assessmentQueryKeys.sessions(vars.assessmentId) });
    },
    ...opt,
  });
};
