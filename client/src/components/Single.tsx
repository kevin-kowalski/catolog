import { Canvas } from "@react-three/fiber";
import WeeModelInfo from "./WeeModelInfo";
import { IElement } from "./utils/WeeTypes";
import { Suspense } from "react";
import LoadingStatus from "./utils/LoadingStatus";
import WeeScene from "./WeeScene";
import WeeModel from "./WeeModel";

function Single ( {model}: { model: IElement} ) {

  /**
   * Render component
   */

  return (<>
    <div className="single">

      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
        <Suspense fallback={<LoadingStatus />}>
          <WeeScene currentScene={'light'}>
            {model && (
              <WeeModel
                currentModel={model}
                currentObjectColor={'rgb(28, 226, 29)'}
                currentScene={'light'}
              />
            )}
          </WeeScene>
        </Suspense>
      </Canvas>

      <WeeModelInfo
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