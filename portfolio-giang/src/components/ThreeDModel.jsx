import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = `${import.meta.env.BASE_URL}/models/Cyber.glb`.replace(/\/\//g, '/');

// Chỉ override EMISSIVE cho các phần đèn/glass — giữ nguyên màu base gốc từ Blender
const EMISSIVE_MAP = {
  "Glass": {
    emissive: new THREE.Color(0.755, 0.022, 1.0),
    emissiveIntensity: 2.0,
  },
  "LightBlue": {
    emissive: new THREE.Color(0.0, 0.252, 1.0),
    emissiveIntensity: 2.5,
  },
  "LightOrange": {
    emissive: new THREE.Color(1.0, 0.185, 0.004),
    emissiveIntensity: 2.0,
  },
};

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef();

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat) => {
        if (!mat) return;

        // Giữ nguyên mat.color gốc từ Blender — KHÔNG override

        const em = EMISSIVE_MAP[mat.name];
        if (em && mat.emissive !== undefined) {
          mat.emissive.copy(em.emissive);
          mat.emissiveIntensity = em.emissiveIntensity;
        }

        // Giảm metalness/roughness extreme để màu base không bị PBR "ăn" mất
        if (mat.metalness !== undefined) mat.metalness = Math.min(mat.metalness, 0.4);
        if (mat.roughness !== undefined) mat.roughness = Math.max(mat.roughness, 0.4);

        mat.needsUpdate = true;
      });
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <Center >
        <primitive object={scene} />
      </Center>
    </group>
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

export default function ThreeDModel({ size = "100%" }) {
  return (
    <div style={{
      width: "100%",
      height: typeof size === "number" ? size : "100%",
      overflow: "hidden",
    }}>
      <Canvas
        style={{ width: "100%", height: "100%", display: "block" }}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
      >
        <hemisphereLight skyColor="#4a5fff" groundColor="#0a0a1a" intensity={1.2} />
        <ambientLight intensity={1.0} />
        <directionalLight position={[4, 6, 4]}   intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#cce0ff" />
        <pointLight       position={[0, 3, 2]}   intensity={1.0} color="#ffffff" />
        <pointLight       position={[-3, -1, 3]} intensity={0.6} color="#8899ff" />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <Model />
          </Bounds>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI * 0.72}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}/models/Cyber.glb`.replace(/\/\//g, '/'));