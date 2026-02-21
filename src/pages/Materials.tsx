import { useState } from "react";

type Category = "Metals" | "Polymers" | "Ceramics" | "Biomaterials" | "Emerging";

interface Material {
  name: string;
  category: Category;
  co2: number;
  biodegradable: boolean;
}

const materials: Material[] = [
  // Metals (5)
  { name: "Titanium Ti-6Al-4V", category: "Metals", co2: 12, biodegradable: false },
  { name: "Stainless Steel 316L", category: "Metals", co2: 8, biodegradable: false },
  { name: "Cobalt-Chrome", category: "Metals", co2: 18, biodegradable: false },
  { name: "Magnesium AZ31", category: "Metals", co2: 6, biodegradable: true },
  { name: "Nitinol NiTi", category: "Metals", co2: 14, biodegradable: false },
  // Polymers (5)
  { name: "PEEK", category: "Polymers", co2: 7, biodegradable: false },
  { name: "UHMWPE", category: "Polymers", co2: 4, biodegradable: false },
  { name: "PMMA Bone Cement", category: "Polymers", co2: 5, biodegradable: false },
  { name: "Silicone Elastomer", category: "Polymers", co2: 3, biodegradable: false },
  { name: "PLA Medical Grade", category: "Polymers", co2: 2, biodegradable: true },
  // Ceramics (5)
  { name: "Alumina Al2O3", category: "Ceramics", co2: 11, biodegradable: false },
  { name: "Zirconia ZrO2", category: "Ceramics", co2: 13, biodegradable: false },
  { name: "Hydroxyapatite", category: "Ceramics", co2: 4, biodegradable: true },
  { name: "Tricalcium Phosphate", category: "Ceramics", co2: 3, biodegradable: true },
  { name: "Bioglass 45S5", category: "Ceramics", co2: 9, biodegradable: true },
  // Biomaterials (5)
  { name: "Collagen Type I", category: "Biomaterials", co2: 1, biodegradable: true },
  { name: "Chitosan", category: "Biomaterials", co2: 2, biodegradable: true },
  { name: "Hyaluronic Acid", category: "Biomaterials", co2: 1, biodegradable: true },
  { name: "Silk Fibroin", category: "Biomaterials", co2: 2, biodegradable: true },
  { name: "Alginate Hydrogel", category: "Biomaterials", co2: 1, biodegradable: true },
  // Emerging (5)
  { name: "Graphene Oxide", category: "Emerging", co2: 16, biodegradable: false },
  { name: "Carbon Nanotube Composite", category: "Emerging", co2: 20, biodegradable: false },
  { name: "Shape Memory Polymer", category: "Emerging", co2: 8, biodegradable: false },
  { name: "Bioprinted Scaffold", category: "Emerging", co2: 3, biodegradable: true },
  { name: "Self-Healing Hydrogel", category: "Emerging", co2: 4, biodegradable: true },
];

const categoryColors: Record<Category, { bg: string; text: string; gradient1: string; gradient2: string; accent: string }> = {
  Metals: { bg: "bg-blue-50", text: "text-blue-700", gradient1: "#94a3b8", gradient2: "#3b82f6", accent: "#60a5fa" },
  Polymers: { bg: "bg-teal-50", text: "text-teal-700", gradient1: "#5eead4", gradient2: "#f0fdfa", accent: "#2dd4bf" },
  Ceramics: { bg: "bg-amber-50", text: "text-amber-800", gradient1: "#fde68a", gradient2: "#fef3c7", accent: "#f59e0b" },
  Biomaterials: { bg: "bg-green-50", text: "text-green-700", gradient1: "#86efac", gradient2: "#dcfce7", accent: "#4ade80" },
  Emerging: { bg: "bg-purple-50", text: "text-purple-700", gradient1: "#a78bfa", gradient2: "#1e3a5f", accent: "#8b5cf6" },
};

type Filter = "All" | Category | "Low CO2" | "Biodegradable";
const filters: Filter[] = ["All", "Metals", "Polymers", "Ceramics", "Biomaterials", "Emerging", "Low CO2", "Biodegradable"];

// --- 3D Shape components ---
const MetalShape = ({ c }: { c: typeof categoryColors.Metals }) => (
  <div className="relative w-20 h-28 flex items-center justify-center">
    {/* Cylinder body */}
    <div className="absolute w-14 h-20 rounded-md" style={{ background: `linear-gradient(135deg, ${c.gradient1} 0%, ${c.gradient2} 50%, ${c.gradient1} 100%)`, boxShadow: `4px 4px 12px rgba(0,0,0,0.15), inset -2px -2px 6px rgba(0,0,0,0.1), inset 2px 2px 6px rgba(255,255,255,0.4)` }} />
    {/* Top ellipse */}
    <div className="absolute top-1 w-14 h-4 rounded-full" style={{ background: `linear-gradient(to bottom, ${c.accent}, ${c.gradient2})`, boxShadow: `inset 0 -1px 3px rgba(0,0,0,0.1)` }} />
    {/* Screw threads */}
    {[0, 1, 2, 3].map(i => (
      <div key={i} className="absolute w-[60px] h-[2px] opacity-30" style={{ top: `${32 + i * 14}%`, background: `linear-gradient(90deg, transparent 0%, ${c.gradient2} 30%, ${c.gradient1} 70%, transparent 100%)` }} />
    ))}
    {/* Bottom ellipse */}
    <div className="absolute bottom-2 w-10 h-3 rounded-full" style={{ background: `linear-gradient(to top, ${c.gradient1}88, transparent)` }} />
  </div>
);

const PolymerShape = ({ c }: { c: typeof categoryColors.Polymers }) => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Mesh layers */}
    {[0, 1, 2].map(i => (
      <div key={i} className="absolute rounded-lg" style={{
        width: `${80 - i * 12}px`, height: `${60 - i * 8}px`,
        top: `${12 + i * 10}px`, left: `${10 + i * 6}px`,
        background: `linear-gradient(${120 + i * 20}deg, ${c.gradient1}${i === 0 ? '' : '88'}, ${c.gradient2})`,
        border: `1px solid ${c.accent}44`,
        boxShadow: i === 0 ? `0 4px 12px rgba(0,0,0,0.08)` : 'none',
        transform: `rotateX(${10 + i * 5}deg) rotateY(${-5 + i * 3}deg)`,
      }} />
    ))}
    {/* Grid lines */}
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="absolute w-full h-[1px]" style={{ top: `${25 + i * 16}%`, background: c.accent }} />
      ))}
      {[0, 1, 2, 3].map(i => (
        <div key={`v${i}`} className="absolute h-full w-[1px]" style={{ left: `${25 + i * 16}%`, background: c.accent }} />
      ))}
    </div>
  </div>
);

const CeramicShape = ({ c }: { c: typeof categoryColors.Ceramics }) => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Crystal facets */}
    <div className="absolute w-16 h-16 rotate-45" style={{
      background: `linear-gradient(135deg, ${c.gradient1}, ${c.gradient2})`,
      boxShadow: `4px 4px 16px rgba(0,0,0,0.1), inset -3px -3px 8px rgba(0,0,0,0.05), inset 3px 3px 8px rgba(255,255,255,0.6)`,
      borderRadius: '4px',
    }} />
    <div className="absolute w-10 h-10 rotate-[30deg]" style={{
      background: `linear-gradient(180deg, ${c.gradient2}, ${c.gradient1}aa)`,
      boxShadow: `inset 2px 2px 6px rgba(255,255,255,0.5)`,
      borderRadius: '2px',
      top: '18px', left: '30px',
    }} />
    {/* Highlight */}
    <div className="absolute w-4 h-4 rounded-full opacity-50" style={{ background: `radial-gradient(circle, white 0%, transparent 70%)`, top: '22px', left: '34px' }} />
  </div>
);

const BiomaterialShape = ({ c }: { c: typeof categoryColors.Biomaterials }) => (
  <div className="relative w-24 h-24 flex items-center justify-center overflow-hidden">
    {/* Wave / membrane layers */}
    {[0, 1, 2].map(i => (
      <div key={i} className="absolute w-full" style={{
        height: '30px',
        top: `${20 + i * 18}px`,
        background: `linear-gradient(90deg, transparent, ${c.gradient1}${i === 1 ? '' : '88'}, transparent)`,
        borderRadius: '50%',
        transform: `scaleX(1.2) translateX(${-4 + i * 4}px)`,
        boxShadow: i === 1 ? `0 2px 8px rgba(0,0,0,0.06)` : 'none',
      }} />
    ))}
    {/* Thread lines */}
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 96 96">
      <path d="M10 50 Q30 30 50 50 Q70 70 90 50" fill="none" stroke={c.accent} strokeWidth="1.5" />
      <path d="M10 60 Q30 40 50 60 Q70 80 90 60" fill="none" stroke={c.accent} strokeWidth="1" />
    </svg>
  </div>
);

const EmergingShape = ({ c }: { c: typeof categoryColors.Emerging }) => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Lattice nodes */}
    {[
      [30, 20], [55, 18], [42, 42], [20, 55], [65, 50], [38, 68], [58, 70],
    ].map(([x, y], i) => (
      <div key={i} className="absolute rounded-full" style={{
        width: '8px', height: '8px',
        left: `${x}px`, top: `${y}px`,
        background: `radial-gradient(circle, ${c.accent}, ${c.gradient1})`,
        boxShadow: `0 0 6px ${c.accent}66`,
      }} />
    ))}
    {/* Lattice connections */}
    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 96 96">
      <line x1="34" y1="24" x2="59" y2="22" stroke={c.gradient1} strokeWidth="1" />
      <line x1="34" y1="24" x2="46" y2="46" stroke={c.gradient1} strokeWidth="1" />
      <line x1="59" y1="22" x2="46" y2="46" stroke={c.gradient1} strokeWidth="1" />
      <line x1="46" y1="46" x2="24" y2="59" stroke={c.gradient1} strokeWidth="1" />
      <line x1="46" y1="46" x2="69" y2="54" stroke={c.gradient1} strokeWidth="1" />
      <line x1="24" y1="59" x2="42" y2="72" stroke={c.gradient1} strokeWidth="1" />
      <line x1="69" y1="54" x2="62" y2="74" stroke={c.gradient1} strokeWidth="1" />
      <line x1="42" y1="72" x2="62" y2="74" stroke={c.gradient2} strokeWidth="1" />
    </svg>
  </div>
);

const ShapeByCategory = ({ category }: { category: Category }) => {
  const c = categoryColors[category];
  switch (category) {
    case "Metals": return <MetalShape c={c} />;
    case "Polymers": return <PolymerShape c={c} />;
    case "Ceramics": return <CeramicShape c={c} />;
    case "Biomaterials": return <BiomaterialShape c={c} />;
    case "Emerging": return <EmergingShape c={c} />;
  }
};

const CO2Badge = ({ co2 }: { co2: number }) => {
  const color = co2 < 5 ? "bg-green-100 text-green-700" : co2 < 15 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>
      {co2} kg CO2
    </span>
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

      {/* Filter bar */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((m) => {
          const cc = categoryColors[m.category];
          return (
            <div
              key={m.name}
              className="group bg-card rounded-2xl border border-border p-5 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:shadow-lg"
              style={{ borderRadius: '16px' }}
            >
              {/* 3D shape area */}
              <div
                className="w-full aspect-square max-w-[140px] rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[3deg] group-hover:scale-105"
                style={{ background: `linear-gradient(145deg, ${cc.gradient1}18, ${cc.gradient2}22)` }}
              >
                <ShapeByCategory category={m.category} />
              </div>

              {/* Info */}
              <div className="flex flex-col items-center gap-2 w-full">
                <span className="font-semibold text-sm text-foreground text-center leading-tight">{m.name}</span>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cc.bg} ${cc.text}`}>
                    {m.category}
                  </span>
                  <CO2Badge co2={m.co2} />
                </div>
              </div>

              {/* Hover lift */}
              <style>{`
                .group:hover {
                  transform: translateY(-4px);
                }
              `}</style>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Materials;
