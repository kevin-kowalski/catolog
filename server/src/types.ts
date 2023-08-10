export interface ObjectType {
  title: string;
  author?: string;
  description?: string;
  glb: string;
  source?: string;
  categories?: string[];
  scale?: number;
  date?: number;
  _id?: string;
};

export interface CategoryType {
  title: string;
  models: string[];
};

export interface UserType {
  email: string;
  password: string;
};