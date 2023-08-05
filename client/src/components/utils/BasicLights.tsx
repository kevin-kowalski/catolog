function BasicLights() {

  /**
   * Render component
   */

  return (
    <group>
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <directionalLight position={[-50, 0, -40]} intensity={0.6} />
    </group>
  );
}

export default BasicLights;