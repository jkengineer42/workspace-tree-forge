import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, AnalyzeRequest, RecordRequest } from "@/lib/api";

export function useAnalyze() {
  return useMutation({
    mutationFn: (data: AnalyzeRequest) => api.analyze(data),
  });
}

export function useRecord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: RecordRequest) => api.record(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => api.getHistory(),
  });
}

export function useMaterialStats(name: string) {
  return useQuery({
    queryKey: ["stats", name],
    queryFn: () => api.getMaterialStats(name),
    enabled: !!name,
  });
}

export function useDeleteMaterialHistory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.deleteMaterialHistory(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
