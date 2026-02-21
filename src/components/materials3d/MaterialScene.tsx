import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { MetalMesh } from "./MetalMesh";
import { PolymerMesh } from "./PolymerMesh";
import { CeramicMesh } from "./CeramicMesh";
import { BiomaterialMesh } from "./BiomaterialMesh";
import { EmergingMesh } from "./EmergingMesh";

type Category = "Metals" | "Polymers" | "Ceramics" | "Biomaterials" | "Emerging";

interface MaterialSceneProps {
  category: Category;
  hovered: boolean;
}

const MeshByCategory = ({ category, hovered }: { category: Category; hovered: boolean }) => {
  switch (category) {
    case "Metals": return <MetalMesh hovered={hovered} />;
    case "Polymers": return <PolymerMesh hovered={hovered} />;
    case "Ceramics": return <CeramicMesh hovered={hovered} />;
    case "Biomaterials": return <BiomaterialMesh hovered={hovered} />;
    case "Emerging": return <EmergingMesh hovered={hovered} />;
  }
};

const MaterialScene = ({ category, hovered }: MaterialSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 3.5], fov: 35 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#b0c4ff" />
      <Suspense fallback={null}>
        <MeshByCategory category={category} hovered={hovered} />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.3}
          scale={4}
          blur={2}
          far={2}
        />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={hovered ? 4 : 1.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );
};

export default MaterialScene;
