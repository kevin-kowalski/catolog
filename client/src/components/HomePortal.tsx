import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  MeshReflectorMaterial,
  useGLTF,
  OrbitControls,
} from '@react-three/drei';

function HomePortal() {
  const { scene } = useGLTF('./default_torus-transformed.glb');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const model = scene.children[0].geometry;

  return (
    <div className="portal-container">
      <Link to={`wee`}>
        <div className="portal hvr-pulse">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 30 }}>
            {model && (
              <>
                <mesh
                  castShadow
                  geometry={model}
                  scale={1.1}
                  position={[0, 0, 0]}
                  rotation={[0.25, 0, 0]}
                >
                  <meshStandardMaterial color={'rgb(30, 220, 30))'} />
                </mesh>
                <color attach="background" args={['#151515']} />
                <fog attach="fog" args={['#212123', 3, 40]} />
                <group position={[0, -1.25, 0]}>
                  <ReflectiveGround />
                </group>
                <DefaultScene />
                <OrbitControls autoRotate />
                <Environment preset="city" />
              </>
            )}
          </Canvas>
        </div>
      </Link>
    </div>
  );
}

function DefaultScene() {
  return (
    <group>
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <directionalLight position={[-50, 0, -40]} intensity={0.5} />
    </group>
  );
}

function ReflectiveGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[200, 100]}
        resolution={256}
        mixBlur={1}
        mixStrength={80}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#070707"
        mirror={0.3}
        metalness={0.5}
      />
    </mesh>
  );
}

export default HomePortal;
