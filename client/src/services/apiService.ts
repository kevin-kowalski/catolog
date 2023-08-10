import { Category, ModelData } from "../types/types";

const baseUrl = 'http://localhost:3001';

// Retrieve all objects from the /models route
export async function getAll(): Promise<ModelData[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/models`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Retrieve all objects of the specified
// category from the /models/category route
export async function getCategory(title: string): Promise<ModelData[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/models/category/${title}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Retrieve the object with the specified
// title from the /models/:title route
export async function getModel(id: string | undefined): Promise<ModelData | undefined> {
  try {
    const response = await fetch(`${baseUrl}/models/${id}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Retrieve all categories from the /categories route
export async function getCategories(): Promise<Category[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Post a newly created category to the database
export async function postCategory(category : object) {
  try{
    const response = await fetch(baseUrl + '/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        category
      )
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Post a newly created model to the database
export async function postModel(model : ModelData): Promise<ModelData | undefined> {
  try {
    const response = await fetch(baseUrl + '/model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {...model, scale: model.scale?.$numberDecimal}
      )
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
 }

// Log in
export async function logIn(user: {email: string, password: string}) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Register
export async function register(user: {email: string, password: string}) {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export function deleteOneObject (id: string | undefined) {
  fetch(baseUrl + '/model/' + id, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .catch(error => console.log(error));
}
export function deleteOneCategory (id: string | undefined) {
  fetch(baseUrl + '/category/' + id, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .catch(error => console.log(error));
}