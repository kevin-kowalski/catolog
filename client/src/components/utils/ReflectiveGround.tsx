import { MeshReflectorMaterial } from "@react-three/drei";

function ReflectiveGround() {

  /**
   * Render component
   */

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

export default ReflectiveGround;