import { Category, ModelData } from "../components/utils/Types";

const baseUrl = 'http://localhost:3001';

// Retrieve all objects from the /models route
export async function getAll() {
  try {
    const response = await fetch(`${baseUrl}/models`);
    const allWeeObjects : ModelData[] = await response.json();
    return allWeeObjects;
  } catch (err) {
    console.log(err);
  }
}

// Retrieve all objects of the specified
// category from the /models/category route
export async function getCategory(title: string) {
  try {
    const response = await fetch(`${baseUrl}/models/category/${title}`);
    const categoryWeeObjects : ModelData[] = await response.json();
    return categoryWeeObjects;
  } catch (err) {
    console.log(err);
  }
}

// Retrieve the object with the specified 
// title from the /models/:title route
export async function getModel(id: string | undefined) {
  try {
    const response = await fetch(`${baseUrl}/models/${id}`);
    console.log(response);
    
    const weeObject = await response.json();
    return weeObject;
  } catch (err) {
    console.log(err)
  }
}



// Retrieve all categories from the /categories route
export async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    const categories : Category[] = await response.json();
    return categories;
  } catch (err) {
    console.log(err);
  }
}
