import { GLTF } from 'three-stdlib';
import { Dispatch, SetStateAction } from 'react';
import { Vector3 } from 'three';

export interface IElement {
  _id: string;
  title: string;
  author: string;
  description: string;
  glb: string;
  category: string;
  source: string;
  scale: numdecimal;
  date: number;
  ypos?: numdecimal;
}

export interface ICategory {
  _id: string;
  title: string;
}

export type numdecimal = {
  $numberDecimal: number;
};

export interface IWeeScene {
  currentScene: string;
  children: JSX.Element;
}

export interface IDefaultScene {
  groundPos?: Vector3;
}

export interface IWeeModel {
  currentModel: IElement;
  currentObjectColor?: string;
  currentScene?: string;
}

export interface IWeeObjectInfo {
  currentScene: string;
  currentModel: IElement;
  currentObjectColor: string;
  setCurrentScene: Dispatch<SetStateAction<string>>;
  setCurrentObjectColor: Dispatch<SetStateAction<string>>;
}

export interface IPopoverPicker {
  currentObjectColor: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;