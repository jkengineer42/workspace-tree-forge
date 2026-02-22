import { useState } from "react";

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

const categoryStyles: Record<Category, { pill: string; gradient: string; shapeColor: string }> = {
  Metal: {
    pill: "bg-slate-100 text-slate-700",
    gradient: "from-slate-200 via-blue-100 to-slate-300",
    shapeColor: "#8fa4b8",
  },
  Polymere: {
    pill: "bg-teal-50 text-teal-700",
    gradient: "from-teal-100 via-white to-teal-50",
    shapeColor: "#5eead4",
  },
  Ceramique: {
    pill: "bg-amber-50 text-amber-800",
    gradient: "from-amber-50 via-orange-50 to-yellow-50",
    shapeColor: "#d4a574",
  },
  Biosource: {
    pill: "bg-green-50 text-green-700",
    gradient: "from-green-100 via-emerald-50 to-green-50",
    shapeColor: "#86efac",
  },
  Composite: {
    pill: "bg-purple-50 text-purple-700",
    gradient: "from-purple-200 via-indigo-100 to-slate-800",
    shapeColor: "#a78bfa",
  },
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

const Shape3D = ({ category, hovered }: { category: Category; hovered: boolean }) => {
  const style = categoryStyles[category];
  const rotation = hovered ? "rotateY(25deg) rotateX(15deg)" : "rotateY(0deg) rotateX(0deg)";
  const base = "transition-transform duration-500 ease-out";

  if (category === "Metal") {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${style.gradient} rounded-xl`}>
        <div className={base} style={{ transform: rotation, perspective: 600, transformStyle: "preserve-3d" }}>
          <div
            style={{
              width: 48,
              height: 72,
              background: "linear-gradient(135deg, #9bb0c4 0%, #6b8cad 50%, #4a6478 100%)",
              borderRadius: 6,
              boxShadow: "4px 6px 16px rgba(0,0,0,0.18), inset -2px -2px 6px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
    );
  }
  if (category === "Polymere") {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${style.gradient} rounded-xl`}>
        <div className={base} style={{ transform: rotation, perspective: 600 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 72 - i * 10,
                  height: 10,
                  background: `linear-gradient(90deg, ${i === 1 ? "#5eead4" : "#99f6e4"}, ${i === 1 ? "#2dd4bf" : "#5eead4"})`,
                  borderRadius: 5,
                  opacity: i === 1 ? 1 : 0.6,
                  boxShadow: "2px 3px 8px rgba(0,0,0,0.08)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (category === "Ceramique") {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${style.gradient} rounded-xl`}>
        <div className={base} style={{ transform: rotation, perspective: 600 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fde68a 0%, #d4a574 60%, #b8860b 100%)",
              boxShadow: "3px 5px 14px rgba(0,0,0,0.12), inset -3px -3px 8px rgba(0,0,0,0.06)",
            }}
          />
        </div>
      </div>
    );
  }
  if (category === "Biosource") {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${style.gradient} rounded-xl`}>
        <div className={base} style={{ transform: rotation, perspective: 600 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path d="M8 32 Q20 12 32 32 Q44 52 56 32" fill="none" stroke="#86efac" strokeWidth="3" />
            <path d="M8 40 Q20 22 32 40 Q44 58 56 40" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.6" />
            <path d="M8 24 Q20 6 32 24 Q44 42 56 24" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.6" />
          </svg>
        </div>
      </div>
    );
  }
  // Composite
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${style.gradient} rounded-xl`}>
      <div className={base} style={{ transform: rotation, perspective: 600 }}>
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              borderRadius: 8,
              position: "absolute",
              top: 0,
              left: 0,
              boxShadow: "3px 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)",
              borderRadius: "50%",
              position: "absolute",
              bottom: 0,
              right: 0,
              boxShadow: "2px 3px 10px rgba(0,0,0,0.12)",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
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
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.12)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="w-full aspect-square rounded-xl overflow-hidden" style={{ maxWidth: 180 }}>
        <Shape3D category={material.category} hovered={hovered} />
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
