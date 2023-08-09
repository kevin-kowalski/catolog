import { Dispatch, SetStateAction } from 'react';

export type NumDecimal = {
  $numberDecimal: number;
};

export interface ModelData {
  _id?: string;
  title: string;
  author?: string;
  description?: string;
  glb: string;
  categories?: string[];
  source?: string;
  scale?: number;
  date?: number;
  ypos?: NumDecimal;
}

export interface Category {
  _id: string;
  title: string;
  models: string[];
}

export interface BackendAdjustedCategory {
  title: string;
  categories: string[];
}

export interface SecondaryNavigationProps {
  collection: Category[],
  setPredicate: React.Dispatch<React.SetStateAction<string>>
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDialogue: React.Dispatch<React.SetStateAction<string>>
}

export interface ModalProps {
  dialogue: string;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allModels: ModelData[];
  collection: Category[];
}

export interface ChecklistProps {
  models: ModelData[]
  setCategoryToPost: Dispatch<SetStateAction<string>>
  categoryToPost: string
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface SceneProps {
  children: JSX.Element;
  isHovered?: boolean;
}

export interface ModelProps {
  currentModel: ModelData;
  currentObjectColor?: string;
  currentScene?: string;
}

export interface SearchProps {
  setFilter: Dispatch<SetStateAction<string | null>>;
}

export interface InfoProps {
  currentScene?: string;
  currentModel: ModelData;
  currentObjectColor?: string;
  setCurrentScene?: Dispatch<SetStateAction<string>>;
  setCurrentObjectColor?: Dispatch<SetStateAction<string>>;
}

export interface PopoverPickerProps {
  currentObjectColor: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;