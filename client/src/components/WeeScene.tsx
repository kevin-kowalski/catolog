function Scene() {
  return (
    <>
      <group>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </group>
    </>
  );
}

export default Scene;
