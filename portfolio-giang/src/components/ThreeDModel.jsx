import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/Cyber.glb";

// Map tên material → màu emissive thực từ Blender
const EMISSIVE_MAP = {
  "Glass":       { emissive: new THREE.Color(0.755, 0.022, 1.0),   emissiveIntensity: 2.5 },
  "LightBlue":   { emissive: new THREE.Color(0.0,   0.252, 1.0),   emissiveIntensity: 3.0 },
  "LightOrange": { emissive: new THREE.Color(1.0,   0.185, 0.004), emissiveIntensity: 2.5 },
};

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef();

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat) => {
        if (!mat) return;
        // Đảm bảo màu base hiển thị đúng sRGB
        if (mat.color) mat.color.convertSRGBToLinear();

        // Áp emissive từ map nếu có
        const em = EMISSIVE_MAP[mat.name];
        if (em && mat.emissive) {
          mat.emissive.copy(em.emissive);
          mat.emissiveIntensity = em.emissiveIntensity;
        }

        // Material.001 màu kem — tô đậm hơn
        if (mat.name === "Material.001") {
          mat.color.set(0.96, 0.87, 0.72);
        }

        mat.needsUpdate = true;
      });
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });

  return (
    <Center ref={ref}>
      <primitive object={scene} />
    </Center>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color="#2563eb" wireframe />
    </mesh>
  );
}

export default function ThreeDModel({ size = 320 }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 1.2, 7], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
      }}
    >
      {/* Ánh sáng vừa đủ — không quá chói để màu base hiện ra */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]}   intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-4, 2, -3]}  intensity={0.6} color="#cce0ff" />
      <pointLight       position={[0, 3, 2]}    intensity={0.8} color="#ffffff" />

      <Suspense fallback={<Loader />}>
        <Bounds fit clip observe>
          <Model />
        </Bounds>
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI * 0.72}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);