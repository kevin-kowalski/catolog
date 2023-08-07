import { Canvas } from "@react-three/fiber";
import Info from "./Info";
import { ModelData } from "./utils/Types";
import { Suspense, useState } from "react";
import LoadingStatus from "./utils/LoadingStatus";
import Scene from "./Scene";
import Model from "./Model";
import { getModel } from "../services/apiService";
import { useParams } from "react-router-dom";

function Single ( {model}: { model: ModelData | null} ) {

  // State variable
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [localModel, setLocalModel] = useState<ModelData | null>(null);
  const { modelId } = useParams();

  if (!model && !localModel) {
    if (modelId) {
      getModel(modelId)
        .then((modelData) => setLocalModel(modelData));
    }
  }

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
            <>
              {localModel && (
                <Model currentModel={localModel} currentObjectColor={'rgb(28, 226, 29)'} />
              )}
              {model && (
                <Model
                currentModel={model}
                currentObjectColor={'rgb(28, 226, 29)'}
                />
              )}
            </>
          </Scene>
        </Suspense>
      </Canvas>
        {localModel && (
          <Info currentModel={localModel}/>
        )}
        {model && (
          <Info currentModel={model!} />
        )}
    </div>
  </>);
}

export default Single;