import { ContactShadows, Environment } from '@react-three/drei';

function PlainScene() {
  return (
    <>
      <BasicLights />
      <Environment preset="city" />
      <ContactShadows
        resolution={512}
        position={[0, -1.5, 0]}
        opacity={0.7}
        scale={10}
        blur={1.25}
        far={3}
      />
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

export default PlainScene;
