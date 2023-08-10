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

  const navigate = useNavigate()

  /* State variables */

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [localModel, setLocalModel] = useState<ModelData | null>(null);

  // Set the model id through the params
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
    console.log(modelId)
    deleteOneObject(modelId)
    navigate('/')

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
      {localModel && (
        <Info currentModel={localModel}/>
      )}
      {model && (
        <Info currentModel={model!} />
      )}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16" onClick={() => {deleteObject(modelId)}}>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </>);
}

export default Single;