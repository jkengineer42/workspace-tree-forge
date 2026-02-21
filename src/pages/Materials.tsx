import { useState, lazy, Suspense } from "react";

const MaterialScene = lazy(() => import("@/components/materials3d/MaterialScene"));

type Category = "Metals" | "Polymers" | "Ceramics" | "Biomaterials" | "Emerging";

interface Material {
  name: string;
  category: Category;
  co2: number;
  biodegradable: boolean;
}

const materials: Material[] = [
  { name: "Titanium Ti-6Al-4V", category: "Metals", co2: 12, biodegradable: false },
  { name: "Stainless Steel 316L", category: "Metals", co2: 8, biodegradable: false },
  { name: "Cobalt-Chrome", category: "Metals", co2: 18, biodegradable: false },
  { name: "Magnesium AZ31", category: "Metals", co2: 6, biodegradable: true },
  { name: "Nitinol NiTi", category: "Metals", co2: 14, biodegradable: false },
  { name: "PEEK", category: "Polymers", co2: 7, biodegradable: false },
  { name: "UHMWPE", category: "Polymers", co2: 4, biodegradable: false },
  { name: "PMMA Bone Cement", category: "Polymers", co2: 5, biodegradable: false },
  { name: "Silicone Elastomer", category: "Polymers", co2: 3, biodegradable: false },
  { name: "PLA Medical Grade", category: "Polymers", co2: 2, biodegradable: true },
  { name: "Alumina Al2O3", category: "Ceramics", co2: 11, biodegradable: false },
  { name: "Zirconia ZrO2", category: "Ceramics", co2: 13, biodegradable: false },
  { name: "Hydroxyapatite", category: "Ceramics", co2: 4, biodegradable: true },
  { name: "Tricalcium Phosphate", category: "Ceramics", co2: 3, biodegradable: true },
  { name: "Bioglass 45S5", category: "Ceramics", co2: 9, biodegradable: true },
  { name: "Collagen Type I", category: "Biomaterials", co2: 1, biodegradable: true },
  { name: "Chitosan", category: "Biomaterials", co2: 2, biodegradable: true },
  { name: "Hyaluronic Acid", category: "Biomaterials", co2: 1, biodegradable: true },
  { name: "Silk Fibroin", category: "Biomaterials", co2: 2, biodegradable: true },
  { name: "Alginate Hydrogel", category: "Biomaterials", co2: 1, biodegradable: true },
  { name: "Graphene Oxide", category: "Emerging", co2: 16, biodegradable: false },
  { name: "Carbon Nanotube Composite", category: "Emerging", co2: 20, biodegradable: false },
  { name: "Shape Memory Polymer", category: "Emerging", co2: 8, biodegradable: false },
  { name: "Bioprinted Scaffold", category: "Emerging", co2: 3, biodegradable: true },
  { name: "Self-Healing Hydrogel", category: "Emerging", co2: 4, biodegradable: true },
];

const categoryStyles: Record<Category, { bg: string; text: string; gradient: string; icon: string }> = {
  Metals: { bg: "bg-blue-50", text: "text-blue-700", gradient: "from-slate-300 via-blue-400 to-slate-400", icon: "M" },
  Polymers: { bg: "bg-teal-50", text: "text-teal-700", gradient: "from-teal-300 via-teal-200 to-emerald-100", icon: "P" },
  Ceramics: { bg: "bg-amber-50", text: "text-amber-800", gradient: "from-amber-200 via-yellow-100 to-amber-100", icon: "C" },
  Biomaterials: { bg: "bg-green-50", text: "text-green-700", gradient: "from-green-300 via-emerald-200 to-green-100", icon: "B" },
  Emerging: { bg: "bg-purple-50", text: "text-purple-700", gradient: "from-purple-400 via-indigo-300 to-blue-900", icon: "E" },
};

type Filter = "All" | Category | "Low CO2" | "Biodegradable";
const filters: Filter[] = ["All", "Metals", "Polymers", "Ceramics", "Biomaterials", "Emerging", "Low CO2", "Biodegradable"];

const CO2Badge = ({ co2 }: { co2: number }) => {
  const color = co2 < 5 ? "bg-green-100 text-green-700" : co2 < 15 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>
      {co2} kg CO2
    </span>
  );
};

/* Static preview shown when 3D is not active */
const StaticPreview = ({ category }: { category: Category }) => {
  const s = categoryStyles[category];
  return (
    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center relative overflow-hidden`}>
      {/* Decorative shapes per category */}
      {category === "Metals" && (
        <>
          <div className="w-10 h-24 rounded-md bg-white/20 backdrop-blur-sm" style={{ boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.1), 4px 4px 12px rgba(0,0,0,0.08)' }} />
          {[0,1,2,3,4].map(i => <div key={i} className="absolute w-12 h-[1.5px] bg-white/30" style={{ top: `${30 + i*10}%` }} />)}
        </>
      )}
      {category === "Polymers" && (
        <>
          {[0,1,2].map(i => <div key={i} className="absolute rounded-lg bg-white/25 backdrop-blur-sm" style={{ width: `${70-i*15}%`, height: '14%', top: `${25+i*20}%`, left: `${15+i*5}%`, transform: `rotate(${-3+i*3}deg)` }} />)}
        </>
      )}
      {category === "Ceramics" && (
        <>
          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm" style={{ boxShadow: 'inset -3px -3px 10px rgba(0,0,0,0.05), 3px 3px 10px rgba(0,0,0,0.06)' }} />
          <div className="absolute w-8 h-8 rotate-45 bg-white/20 top-6 right-8 rounded-sm" />
        </>
      )}
      {category === "Biomaterials" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140">
          <path d="M10 70 Q40 30 70 70 Q100 110 130 70" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
          <path d="M10 85 Q40 50 70 85 Q100 120 130 85" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <path d="M10 55 Q40 20 70 55 Q100 90 130 55" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        </svg>
      )}
      {category === "Emerging" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140">
          {[[40,30],[80,25],[60,60],[30,80],[100,70],[55,100],[90,95]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="rgba(255,255,255,0.5)" />
          ))}
          {[[40,30,80,25],[80,25,60,60],[40,30,60,60],[60,60,30,80],[60,60,100,70],[30,80,55,100],[100,70,90,95],[55,100,90,95]].map(([x1,y1,x2,y2],i) => (
            <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          ))}
        </svg>
      )}
    </div>
  );
};

const MaterialCard = ({ material }: { material: Material }) => {
  const [hovered, setHovered] = useState(false);
  const pill = categoryStyles[material.category];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300"
      style={{
        borderRadius: '16px',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* 3D / static preview */}
      <div className="w-full aspect-square rounded-xl overflow-hidden relative" style={{ maxWidth: 180 }}>
        {hovered ? (
          <Suspense fallback={<StaticPreview category={material.category} />}>
            <MaterialScene category={material.category} hovered={hovered} />
          </Suspense>
        ) : (
          <StaticPreview category={material.category} />
        )}
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <span className="font-semibold text-sm text-foreground text-center leading-tight">{material.name}</span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${pill.bg} ${pill.text}`}>
            {material.category}
          </span>
          <CO2Badge co2={material.co2} />
        </div>
      </div>
    </div>
  );
};

const Materials = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = materials.filter((m) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Low CO2") return m.co2 < 5;
    if (activeFilter === "Biodegradable") return m.biodegradable;
    return m.category === activeFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-foreground mb-1">Materials</h1>
        <p className="text-muted-foreground text-sm">Browse sustainable materials for your projects</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeFilter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((m) => (
          <MaterialCard key={m.name} material={m} />
        ))}
      </div>
    </div>
  );
};

export default Materials;
