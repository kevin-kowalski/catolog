import { Dispatch, SetStateAction } from 'react';

export type NumDecimal = {
  $numberDecimal: number;
};

export interface ModelData {
  _id: string;
  title: string;
  author: string;
  description: string;
  glb: string;
  category: string;
  source: string;
  scale: NumDecimal;
  date: number;
  ypos?: NumDecimal;
}

export interface Category {
  _id: string;
  title: string;
}

export interface SecondaryNavigationProps {
  collection: Category[],
  setPredicate: React.Dispatch<React.SetStateAction<string>>
}

export interface SceneProps {
  currentScene: string;
  children: JSX.Element;
}

export interface ModelProps {
  currentModel: ModelData;
  currentObjectColor?: string;
  currentScene?: string;
}

export interface InfoProps {
  currentScene: string;
  currentModel: ModelData;
  currentObjectColor: string;
  setCurrentScene: Dispatch<SetStateAction<string>>;
  setCurrentObjectColor: Dispatch<SetStateAction<string>>;
}

export interface PopoverPickerProps {
  currentObjectColor: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;