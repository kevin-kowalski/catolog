import { Canvas } from "@react-three/fiber";
import Info from "./Info";
import { ModelData } from "./utils/WeeTypes";
import { Suspense } from "react";
import LoadingStatus from "./utils/LoadingStatus";
import Scene from "./Scene";
import Model from "./Model";

function Single ( {model}: { model: ModelData} ) {

  /**
   * Render component
   */

  return (<>
    <div className="single">

      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
        <Suspense fallback={<LoadingStatus />}>
          <Scene currentScene={'light'}>
            {model && (
              <Model
                currentModel={model}
                currentObjectColor={'rgb(28, 226, 29)'}
                currentScene={'light'}
              />
            )}
          </Scene>
        </Suspense>
      </Canvas>

      <Info
        currentScene={'light'}
        currentModel={model}
        currentObjectColor={'rgb(28, 226, 29)'}
        setCurrentScene={() => {}}
        setCurrentObjectColor={() => {}}
      />
    </div>
  </>);
}

export default Single;