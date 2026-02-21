import { useState, useMemo } from "react";
import MaterLogo from "@/components/MaterLogo";
import ScrollColumn from "@/components/ScrollColumn";

const FIELDS = ["Medicine", "Architecture", "Mechanics", "Geology", "Aerospace", "Automotive"];

const SPECIALTIES: Record<string, string[]> = {
  Medicine: ["Odontology", "Dental", "Pediatrics", "Orthopedics", "Cardiovascular"],
  Architecture: ["Urban Design", "Interior", "Landscape", "Structural", "Sustainable"],
  Mechanics: ["Thermodynamics", "Fluid Dynamics", "Robotics", "Materials", "Vibrations"],
  Geology: ["Seismology", "Mineralogy", "Petrology", "Hydrology", "Volcanology"],
  Aerospace: ["Propulsion", "Avionics", "Aerodynamics", "Orbital", "Composites"],
  Automotive: ["Powertrain", "Chassis", "Electronics", "Safety", "Aerodynamics"],
};

const OPTIMIZATIONS = [
  "Most Optimal",
  "Most Sustainable",
  "Most Carbon Efficient",
  "Most Economical",
];

const Index = () => {
  const [fieldIndex, setFieldIndex] = useState(0);
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [optIndex, setOptIndex] = useState(0);

  const currentSpecialties = useMemo(
    () => SPECIALTIES[FIELDS[fieldIndex]] || SPECIALTIES.Medicine,
    [fieldIndex]
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Sage gradient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-sage/30 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <MaterLogo />
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-3 tracking-wide">
            A new way to build sustainably
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight">
            Configure your workspace
          </h1>
        </div>

        {/* Scroll columns */}
        <div className="w-full max-w-2xl mx-auto flex gap-1 sm:gap-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-border p-4 sm:p-6 shadow-sm mb-10">
          <ScrollColumn
            title="Field"
            items={FIELDS}
            selectedIndex={fieldIndex}
            onSelect={setFieldIndex}
          />
          <div className="w-px bg-border self-stretch my-8" />
          <ScrollColumn
            title="Specialty"
            items={currentSpecialties}
            selectedIndex={specialtyIndex}
            onSelect={setSpecialtyIndex}
          />
          <div className="w-px bg-border self-stretch my-8" />
          <ScrollColumn
            title="Optimization"
            items={OPTIMIZATIONS}
            selectedIndex={optIndex}
            onSelect={setOptIndex}
          />
        </div>

        {/* CTA */}
        <button className="px-10 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-forest-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
          Start Browsing
        </button>
      </main>
    </div>
  );
};

export default Index;
