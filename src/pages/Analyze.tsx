import { useState } from "react";
import { useAnalyze, useRecord } from "@/hooks/use-api";
import { Loader2, Send, CheckCircle2, AlertTriangle, Brain, Leaf, Activity } from "lucide-react";
import { toast } from "sonner";
import type { AnalyzeResponse, MaterialRecommendation } from "@/lib/api";

const ConfidenceBadge = ({ level }: { level: string }) => {
  const config: Record<string, { cls: string; label: string }> = {
    haute:   { cls: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", label: "Confiance haute" },
    moyenne: { cls: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", label: "Confiance moyenne" },
    faible:  { cls: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", label: "Confiance faible" },
  };
  const c = config[level] || config.moyenne;
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.cls}`}>{c.label}</span>;
};

const CO2Badge = ({ value }: { value: number }) => {
  const cls = value < 5
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    : value < 20
      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{value} kg CO2/kg</span>;
};

const RecommendationCard = ({
  rec,
  rank,
  onRecord,
  recording,
}: {
  rec: MaterialRecommendation;
  rank: number;
  onRecord: (rec: MaterialRecommendation) => void;
  recording: boolean;
}) => (
  <div className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {rank}
        </span>
        <h3 className="font-semibold text-foreground">{rec.nom}</h3>
      </div>
      <CO2Badge value={rec.co2_kg} />
    </div>
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="text-center p-2 rounded-lg bg-muted">
        <Activity className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Clinique</p>
        <p className="font-mono font-semibold text-foreground">{rec.score_clinique?.toFixed(1) ?? "–"}</p>
      </div>
      <div className="text-center p-2 rounded-lg bg-muted">
        <Leaf className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Eco</p>
        <p className="font-mono font-semibold text-foreground">{rec.score_environnemental?.toFixed(1) ?? "–"}</p>
      </div>
      <div className="text-center p-2 rounded-lg bg-muted">
        <Brain className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Global</p>
        <p className="font-mono font-semibold text-foreground">{rec.score_global?.toFixed(1) ?? "–"}</p>
      </div>
    </div>
    <button
      onClick={() => onRecord(rec)}
      disabled={recording}
      className="w-full py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors disabled:opacity-50"
    >
      {recording ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Enregistrer cette utilisation"}
    </button>
  </div>
);

const Analyze = () => {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const analyze = useAnalyze();
  const record = useRecord();

  const handleSubmit = () => {
    if (!description.trim()) {
      toast.warning("Decrivez le besoin chirurgical d'abord.");
      return;
    }
    analyze.mutate(
      { description },
      {
        onSuccess: (data) => setResult(data),
        onError: (err) => toast.error(`Erreur analyse : ${err.message}`),
      }
    );
  };

  const handleRecord = (rec: MaterialRecommendation) => {
    if (!result) return;
    record.mutate(
      {
        materiau_recommande: rec.nom,
        age_patient: result.context.patient_jeune ? 25 : 55,
        pathologie: result.context.type_chirurgie,
        materiau_habituel: "Non specifie",
        gain_co2: rec.co2_kg,
      },
      {
        onSuccess: () => toast.success(`${rec.nom} enregistre avec succes.`),
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl text-foreground mb-1">Analyse chirurgicale</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Decrivez le besoin et obtenez les 3 meilleurs materiaux recommandes
      </p>

      {/* Input */}
      <div className="rounded-xl border border-border bg-card p-5 mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Description du besoin chirurgical
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Ex : "plaque tibiale, patient jeune de 22 ans, retrait prevu dans 18 mois"'
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={analyze.isPending}
          className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {analyze.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyser
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {analyze.isError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">Erreur</p>
            <p className="text-sm text-destructive/80">{analyze.error.message}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Context */}
          <div className="rounded-xl border border-border bg-card p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Contexte extrait</h2>
              <ConfidenceBadge level={result.context.confiance} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Type", value: result.context.type_chirurgie },
                { label: "Patient jeune", value: result.context.patient_jeune ? "Oui" : "Non" },
                { label: "IRM necessaire", value: result.context.irm_necessaire ? "Oui" : "Non" },
                { label: "Retrait prevu", value: result.context.retrait_prevu ? "Oui" : "Non" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            {result.context.contraintes && (
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Contraintes :</span> {result.context.contraintes}
              </p>
            )}
          </div>

          {/* Top 3 */}
          <h2 className="font-semibold text-foreground mb-4">Top 3 recommandations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {result.recommendations.map((rec, i) => (
              <RecommendationCard
                key={rec.nom}
                rec={rec}
                rank={i + 1}
                onRecord={handleRecord}
                recording={record.isPending}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Analyze;
