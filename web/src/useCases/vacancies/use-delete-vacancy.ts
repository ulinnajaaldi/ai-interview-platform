import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { vacanciesApi } from "@/services/vacancies";
import { vacancyQueryKeys } from "./queryKeys";

export const useDeleteVacancy = (
  opt?: UseMutationOptions<void, Error, number>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => vacanciesApi.delete(id).then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: vacancyQueryKeys.all }),
    ...opt,
  });
};
