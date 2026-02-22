import { useState, lazy, Suspense } from "react";

const MaterialScene = lazy(() => import("@/components/materials3d/MaterialScene"));

type Category = "Metal" | "Polymere" | "Ceramique" | "Biosource" | "Composite";

interface Material {
  name: string;
  category: Category;
  co2: number;
}

const materials: Material[] = [
  { name: "Titane Grade 5", category: "Metal", co2: 42 },
  { name: "Titane Grade 23", category: "Metal", co2: 44 },
  { name: "Titane Poreux 3D", category: "Metal", co2: 68 },
  { name: "Acier 316L", category: "Metal", co2: 5.1 },
  { name: "Cobalt-Chrome", category: "Metal", co2: 51 },
  { name: "Tantale Poreux", category: "Metal", co2: 152 },
  { name: "Nitinol", category: "Metal", co2: 91 },
  { name: "Magnesium Bio", category: "Metal", co2: 18.5 },
  { name: "PEEK Standard", category: "Polymere", co2: 9.8 },
  { name: "UHMWPE Vit-E", category: "Polymere", co2: 3.4 },
  { name: "PLA Biosource", category: "Polymere", co2: 2.2 },
  { name: "PLGA Resorbable", category: "Polymere", co2: 3.0 },
  { name: "PMMA Chirurgical", category: "Polymere", co2: 4.5 },
  { name: "Polyurethane Bio", category: "Polymere", co2: 5.5 },
  { name: "ePTFE Gore-Tex", category: "Polymere", co2: 9.1 },
  { name: "Silicone Medical", category: "Polymere", co2: 6.2 },
  { name: "Hydroxyapatite", category: "Ceramique", co2: 3.1 },
  { name: "Alumine BIOLOX", category: "Ceramique", co2: 8.5 },
  { name: "Alumine-Zircone BIOLOX delta", category: "Ceramique", co2: 10.5 },
  { name: "Zircone Y-TZP", category: "Ceramique", co2: 12.8 },
  { name: "PEEK Fibres Carbone", category: "Composite", co2: 29 },
  { name: "Beta-TCP", category: "Ceramique", co2: 3.0 },
  { name: "Bioglass 45S5", category: "Ceramique", co2: 5.0 },
  { name: "Os Allogene", category: "Biosource", co2: 1.0 },
  { name: "Collagene Bovin", category: "Biosource", co2: 4.0 },
  { name: "Acide Hyaluronique", category: "Biosource", co2: 1.5 },
  { name: "Xenogreffe Porcine", category: "Biosource", co2: 3.2 },
  { name: "Pyrocarbone", category: "Composite", co2: 25 },
  { name: "Scaffold PCL", category: "Composite", co2: 3.3 },
  { name: "Dacron Polyester", category: "Composite", co2: 5.8 },
];

const categoryStyles: Record<Category, { pill: string; gradient: string }> = {
  Metal: { pill: "bg-slate-100 text-slate-700", gradient: "from-slate-200 via-blue-100 to-slate-300" },
  Polymere: { pill: "bg-teal-50 text-teal-700", gradient: "from-teal-100 via-white to-teal-50" },
  Ceramique: { pill: "bg-amber-50 text-amber-800", gradient: "from-amber-50 via-orange-50 to-yellow-50" },
  Biosource: { pill: "bg-green-50 text-green-700", gradient: "from-green-100 via-emerald-50 to-green-50" },
  Composite: { pill: "bg-purple-50 text-purple-700", gradient: "from-purple-200 via-indigo-100 to-slate-800" },
};

type Filter = "All" | Category;
const filters: Filter[] = ["All", "Metal", "Polymere", "Ceramique", "Biosource", "Composite"];

const CO2Badge = ({ co2 }: { co2: number }) => {
  const color =
    co2 < 5
      ? "bg-green-100 text-green-700"
      : co2 < 20
        ? "bg-orange-100 text-orange-700"
        : "bg-red-100 text-red-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>
      {co2} kg CO2
    </span>
  );
};

const StaticPreview = ({ category }: { category: Category }) => {
  const s = categoryStyles[category];
  return (
    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center relative overflow-hidden`}>
      {category === "Metal" && (
        <>
          <div className="w-10 h-24 rounded-md bg-white/20 backdrop-blur-sm" style={{ boxShadow: "inset -2px 0 8px rgba(0,0,0,0.1), 4px 4px 12px rgba(0,0,0,0.08)" }} />
          {[0,1,2,3,4].map(i => <div key={i} className="absolute w-12 h-[1.5px] bg-white/30" style={{ top: `${30 + i*10}%` }} />)}
        </>
      )}
      {category === "Polymere" && (
        <>
          {[0,1,2].map(i => <div key={i} className="absolute rounded-lg bg-white/25 backdrop-blur-sm" style={{ width: `${70-i*15}%`, height: "14%", top: `${25+i*20}%`, left: `${15+i*5}%`, transform: `rotate(${-3+i*3}deg)` }} />)}
        </>
      )}
      {category === "Ceramique" && (
        <>
          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm" style={{ boxShadow: "inset -3px -3px 10px rgba(0,0,0,0.05), 3px 3px 10px rgba(0,0,0,0.06)" }} />
          <div className="absolute w-8 h-8 rotate-45 bg-white/20 top-6 right-8 rounded-sm" />
        </>
      )}
      {category === "Biosource" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140">
          <path d="M10 70 Q40 30 70 70 Q100 110 130 70" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
          <path d="M10 85 Q40 50 70 85 Q100 120 130 85" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <path d="M10 55 Q40 20 70 55 Q100 90 130 55" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        </svg>
      )}
      {category === "Composite" && (
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
  const style = categoryStyles[material.category];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300"
      style={{
        borderRadius: 16,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
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
        <span className="font-semibold text-sm text-foreground text-center leading-tight">
          {material.name}
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.pill}`}>
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
