const API_URL = import.meta.env.VITE_API_URL || "https://surggreen-production.up.railway.app";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `API error ${res.status}`);
  }
  return res.json();
}

// ── Types ────────────────────────────────────────────────────────

export interface AnalyzeRequest {
  description: string;
}

export interface SurgicalContext {
  type_chirurgie: string;
  retrait_prevu: boolean;
  patient_jeune: boolean;
  irm_necessaire: boolean;
  contraintes: string;
  confiance: "haute" | "moyenne" | "faible";
}

export interface MaterialRecommendation {
  nom: string;
  score_global: number;
  score_clinique: number;
  score_environnemental: number;
  co2_kg: number;
  [key: string]: unknown;
}

export interface AnalyzeResponse {
  context: SurgicalContext;
  recommendations: MaterialRecommendation[];
}

export interface RecordRequest {
  materiau_recommande: string;
  age_patient: number;
  pathologie: string;
  materiau_habituel: string;
  gain_co2: number;
}

export interface UsageEntry {
  date: string;
  age_patient: number;
  pathologie: string;
  materiau_habituel: string;
  gain_co2_kg: number;
}

export interface MaterialStats {
  count: number;
  age_moyen?: number;
  gain_co2_total?: number;
  gain_co2_moyen?: number;
  pathologie_top?: string;
  habituel_top?: string;
  pathologies?: Record<string, number>;
  habituels?: Record<string, number>;
  derniere_utilisation?: string;
}

// ── API calls ────────────────────────────────────────────────────

export const api = {
  analyze: (data: AnalyzeRequest) =>
    request<AnalyzeResponse>("/analyze", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  record: (data: RecordRequest) =>
    request<{ status: string }>("/record", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getHistory: () =>
    request<Record<string, UsageEntry[]>>("/history"),

  getMaterialHistory: (name: string) =>
    request<UsageEntry[]>(`/history/${encodeURIComponent(name)}`),

  getMaterialStats: (name: string) =>
    request<MaterialStats>(`/stats/${encodeURIComponent(name)}`),

  deleteMaterialHistory: (name: string) =>
    request<{ status: string }>(`/history/${encodeURIComponent(name)}`, {
      method: "DELETE",
    }),
};
