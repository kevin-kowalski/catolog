import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function HomePortal() {
  const { scene } = useGLTF('./default_torus-transformed.glb');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const model = scene.children[0].geometry;

  return (
    <div className="portal-container">
      <div className="portal">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
          {model && (
            <>
              <mesh
                castShadow
                geometry={model}
                scale={1.15}
                position={[0, 0, 0]}
                rotation={[0.25, 0, 0]}
              >
                <meshStandardMaterial color={'rgb(24, 177, 24))'} />
              </mesh>
              <DefaultScene />
              <color attach="background" args={['#2d2d42']} />

              <OrbitControls autoRotate />
            </>
          )}
        </Canvas>
      </div>
    </div>
  );
}

function DefaultScene() {
  return (
    <group>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </group>
  );
}

export default HomePortal;
