import { Canvas } from "@react-three/fiber";
import Info from "./Info";
import { ModelData } from "./utils/Types";
import { Suspense, useState } from "react";
import LoadingStatus from "./utils/LoadingStatus";
import Scene from "./Scene";
import Model from "./Model";

function Single ( {model}: { model: ModelData} ) {

  // State variable
  const [isHovered, setIsHovered] = useState<boolean>(false);

  /**
   * Handler functions
   */

  // When the user hovers over the component
  function handleHover (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLDivElement;
    if (target) {
      setIsHovered(!isHovered);
    }
  }

  /**
   * Render component
   */

  return (<>
    <div onMouseOver={handleHover} onMouseOut={handleHover} className="single">

      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
        <Suspense fallback={<LoadingStatus />}>
          <Scene isHovered={isHovered}>
            {model && (
              <Model
                currentModel={model}
                currentObjectColor={'rgb(28, 226, 29)'}
              />
            )}
          </Scene>
        </Suspense>
      </Canvas>

      <Info currentModel={model} />
    </div>
  </>);
}

export default Single;