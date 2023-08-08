export interface Object {
  title: string;
  author: string;
  description: string;
  glb: string;
  source: string;
  categories: string[];
  scale: number;
  date: number;
}

export interface Category {
  title: string;
  models: string[];
}

export interface User {
  email: string;
  password: string;
}