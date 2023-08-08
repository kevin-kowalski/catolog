const baseUrl = 'http://localhost:3001';

// Retrieve all objects from the /models route
export async function getAll() {
  try {
    const response = await fetch(`${baseUrl}/models`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Retrieve all objects of the specified
// category from the /models/category route
export async function getCategory(title: string) {
  try {
    const response = await fetch(`${baseUrl}/models/category/${title}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// Retrieve the object with the specified
// title from the /models/:title route
export async function getModel(id: string | undefined) {
  try {
    const response = await fetch(`${baseUrl}/models/${id}`);
    return await response.json();
  } catch (err) {
    console.log(err)
  }
}

// Retrieve all categories from the /categories route
export async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/categories`);
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