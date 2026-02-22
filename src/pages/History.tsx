import { useState } from "react";
import { useHistory, useMaterialStats, useDeleteMaterialHistory } from "@/hooks/use-api";
import { Loader2, Trash2, BarChart3, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { MaterialStats, UsageEntry } from "@/lib/api";

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg bg-muted p-3 text-center">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="font-mono font-semibold text-foreground text-lg">{value}</p>
  </div>
);

const StatsPanel = ({ name }: { name: string }) => {
  const { data: stats, isLoading, isError } = useMaterialStats(name);

  if (isLoading) return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mx-auto my-4" />;
  if (isError || !stats || stats.count === 0) return <p className="text-sm text-muted-foreground py-2">Aucune statistique disponible.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
      <StatCard label="Utilisations" value={stats.count} />
      <StatCard label="Age moyen" value={stats.age_moyen ?? "–"} />
      <StatCard label="CO2 economise total" value={`${stats.gain_co2_total ?? 0} kg`} />
      <StatCard label="CO2 economise moyen" value={`${stats.gain_co2_moyen ?? 0} kg`} />
    </div>
  );
};

const History = () => {
  const { data: history, isLoading, isError, error } = useHistory();
  const deleteMutation = useDeleteMaterialHistory();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showStats, setShowStats] = useState<string | null>(null);

  const handleDelete = (name: string) => {
    if (!confirm(`Supprimer tout l'historique de "${name}" ?`)) return;
    deleteMutation.mutate(name, {
      onSuccess: () => toast.success(`Historique de ${name} supprime.`),
      onError: (err) => toast.error(err.message),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Chargement de l'historique...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 flex items-start gap-3 max-w-2xl mx-auto mt-12">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-destructive">Impossible de charger l'historique</p>
          <p className="text-sm text-destructive/80">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  const materials = Object.keys(history || {});

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl text-foreground mb-1">Historique des utilisations</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Consultez et gerez l'historique d'utilisation des materiaux
      </p>

      {materials.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Aucun historique enregistre pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((name) => {
            const entries = (history as Record<string, UsageEntry[]>)[name];
            const isOpen = expanded === name;
            return (
              <div key={name} className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4">
                  <button
                    onClick={() => setExpanded(isOpen ? null : name)}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    <span className="font-semibold text-foreground">{name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                      {entries.length} utilisation{entries.length > 1 ? "s" : ""}
                    </span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowStats(showStats === name ? null : name)}
                      className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                      title="Statistiques"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(name)}
                      disabled={deleteMutation.isPending}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {showStats === name && (
                  <div className="px-5 pb-4">
                    <StatsPanel name={name} />
                  </div>
                )}

                {isOpen && (
                  <div className="border-t border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left px-5 py-2 text-xs font-medium text-muted-foreground">Date</th>
                          <th className="text-left px-5 py-2 text-xs font-medium text-muted-foreground">Age patient</th>
                          <th className="text-left px-5 py-2 text-xs font-medium text-muted-foreground">Pathologie</th>
                          <th className="text-left px-5 py-2 text-xs font-medium text-muted-foreground">Materiau habituel</th>
                          <th className="text-right px-5 py-2 text-xs font-medium text-muted-foreground">Gain CO2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry, i) => (
                          <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                            <td className="px-5 py-2.5 text-foreground">{entry.date}</td>
                            <td className="px-5 py-2.5 text-foreground">{entry.age_patient} ans</td>
                            <td className="px-5 py-2.5 text-foreground">{entry.pathologie}</td>
                            <td className="px-5 py-2.5 text-foreground">{entry.materiau_habituel}</td>
                            <td className="px-5 py-2.5 text-right font-mono text-foreground">{entry.gain_co2_kg} kg</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
