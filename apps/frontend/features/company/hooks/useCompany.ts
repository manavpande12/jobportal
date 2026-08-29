import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCompany, getCompany, updateCompany } from "../services/company.service";

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company-me"] })
        }
    });
}

export const useCreateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company-me"] })
        }
    });
}



export const useGetCompany = (enabled = true) => {
    return useQuery({
        queryKey: ["company-me"],
        queryFn: async () => {
            const res = await getCompany();
            return res.data;
        },
        enabled
    });
}