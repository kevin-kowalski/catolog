import { Environment, MeshReflectorMaterial } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
  HueSaturation,
} from '@react-three/postprocessing';
import { Vector3 } from 'three';

interface IDefaultScene {
  groundPos?: Vector3;
}

const defaultGroundPos = new Vector3(0, -0.575, 0);

function DefaultScene({ groundPos = defaultGroundPos }: IDefaultScene) {
  return (
    <>
      <BasicLights />
      <Environment preset="city" />
      <color attach="background" args={['#151515']} />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={1} />
        <BrightnessContrast brightness={0} contrast={0.1} />
        <HueSaturation hue={0} saturation={-0.25} />
      </EffectComposer>
      <group position={groundPos}>
        <ReflectiveGround />
      </group>
    </>
  );
}

function BasicLights() {
  return (
    <group>
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <directionalLight position={[-50, 0, -40]} intensity={0.6} />
    </group>
  );
}

function ReflectiveGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[25, 25]} />
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

export default DefaultScene;
