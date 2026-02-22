import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { MetalMesh } from "./MetalMesh";
import { PolymerMesh } from "./PolymerMesh";
import { CeramicMesh } from "./CeramicMesh";
import { BiosourceMesh } from "./BiosourceMesh";
import { CompositeMesh } from "./CompositeMesh";

type Category = "Metal" | "Polymere" | "Ceramique" | "Biosource" | "Composite";

interface MaterialSceneProps {
  category: Category;
  hovered: boolean;
}

const MeshByCategory = ({ category, hovered }: { category: Category; hovered: boolean }) => {
  switch (category) {
    case "Metal": return <MetalMesh hovered={hovered} />;
    case "Polymere": return <PolymerMesh hovered={hovered} />;
    case "Ceramique": return <CeramicMesh hovered={hovered} />;
    case "Biosource": return <BiosourceMesh hovered={hovered} />;
    case "Composite": return <CompositeMesh hovered={hovered} />;
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
