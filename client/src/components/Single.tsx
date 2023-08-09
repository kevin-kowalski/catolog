import { Canvas } from "@react-three/fiber";
import Info from "./Info";
import { ModelData } from "../types/types";
import { Suspense, useEffect, useState } from "react";
import LoadingStatus from "./fiber/LoadingStatus";
import Scene from "./Scene";
import Model from "./Model";
import { getModel } from "../services/apiService";
import { useParams } from "react-router-dom";

function Single ( {model}: { model: ModelData | null} ) {

  /* State variables */

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [localModel, setLocalModel] = useState<ModelData | null>(null);

  // Set the model id through the params
  const { modelId } = useParams();

  /* Use effect */

  // If no model was passed as a prop,
  // retrieve the model through the API service’s
  // getModel function, using the modelId
  useEffect(() => {
    if (!model && !localModel && modelId) {
      getModel(modelId)
        .then((modelData) => {
          if (modelData) setLocalModel(modelData);
        });
    }
  }, []);

  /* Handler functions */

  // When the user hovers over the component
  function handleHover (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLDivElement;
    if (target) {
      setIsHovered(!isHovered);
    }
  }

  /* Render component */

  return (<>
    <div className="single" onMouseOver={handleHover} onMouseOut={handleHover} >

      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
        <Suspense fallback={<LoadingStatus />}>
          <Scene isHovered={isHovered}>
            <>
              {localModel && (
                <Model currentModel={localModel}
                currentObjectColor={'rgb(28, 226, 29)'} />
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