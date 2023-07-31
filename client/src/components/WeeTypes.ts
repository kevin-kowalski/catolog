import { GLTF } from 'three-stdlib';
import { Dispatch, SetStateAction } from 'react';

export interface IElement {
  title: string;
  author: string;
  source: string;
  description: string;
  glb: string;
  scale: numdecimal;
  ypos: numdecimal;
  date: number;
}

export type numdecimal = {
  $numberDecimal: number;
};

export interface IWeeObjectInfo {
  category: string;
  model: IElement;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

export type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};
