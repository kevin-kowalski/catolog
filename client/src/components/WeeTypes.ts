import { GLTF } from 'three-stdlib';

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
}

export type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};
