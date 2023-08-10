import { Canvas } from "@react-three/fiber";
import Info from "./Info";
import { ModelData } from "../types/types";
import { Suspense, useEffect, useState } from "react";
import LoadingStatus from "./fiber/LoadingStatus";
import Scene from "./fiber/Scene";
import Model from "./Model";
import { deleteOneObject, getModel } from "../services/apiService";
import { useParams, useNavigate } from "react-router-dom";

function Single ( {model}: { model: ModelData | null} ) {

  /* State variables */

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [localModel, setLocalModel] = useState<ModelData | null>(null);

  /* Hook */

  const navigate = useNavigate();
  const { modelId } = useParams();

  /* Constant */

  const objectColor = generateRandomColorString();

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
  function handleMouseOver (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLDivElement;
    if (target) {
      setIsHovered(true);
    }
  }

  // When the user stops hovering over the component
  function handleMouseOut (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLDivElement;
    if (target) {
      setIsHovered(false);
    }
  }

  function deleteObject (modelId: string | undefined) {
    console.log(modelId);
    deleteOneObject(modelId);
    navigate('/');
  }

  /* Helper function */

  // Generate a random value for each color channel,
  // and build a rgb color string from them
  function generateRandomColorString () {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Format the color string in the "rgb(r, g, b)" format
    const colorString = "rgb(" + red + ", " + green + ", " + blue + ")";

    return colorString;
  }

  /* Render component */

  return (<>
    <div className="single appear" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >

      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
        <Suspense fallback={<LoadingStatus />}>
          <Scene isHovered={isHovered}>
            <>
              {localModel && (
                <Model currentModel={localModel}
                currentObjectColor={objectColor} />
              )}
              {model && (
                <Model
                currentModel={model}
                currentObjectColor={objectColor}
                />
              )}
            </>
          </Scene>
        </Suspense>
      </Canvas>
      <div className="info-container">
        {localModel && (
          <Info currentModel={localModel}/>
          )}
        {model && (
          <Info currentModel={model!} />
          )}
        <div className="button-group">
          <p className="button danger" onClick={() => {deleteObject(modelId)}}>Delete Object</p>
        </div>
      </div>
    </div>
  </>);
}

export default Single;