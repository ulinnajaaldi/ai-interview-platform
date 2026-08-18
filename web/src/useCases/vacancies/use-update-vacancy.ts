import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { vacanciesApi, type VacancyPayload } from "@/services/vacancies";
import { vacancyQueryKeys } from "./queryKeys";

export const useUpdateVacancy = (
  opt?: UseMutationOptions<
    Awaited<ReturnType<typeof vacanciesApi.update>>["data"],
    Error,
    { id: number; data: VacancyPayload }
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => vacanciesApi.update(id, data).then((r) => r.data),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: vacancyQueryKeys.all });
      qc.invalidateQueries({ queryKey: vacancyQueryKeys.detail(vars.id) });
    },
    ...opt,
  });
};
