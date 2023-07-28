import { GLTF } from 'three-stdlib';

export interface IElement {
  title: string;
  author: string;
  description: string;
  glb: string;
  scale: scale;
  date: number;
}

export type scale = {
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
