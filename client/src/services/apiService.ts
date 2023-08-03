const baseUrl = 'http://localhost:3001';

export async function getAll() {
  try {
    const response = await fetch(`${baseUrl}/models`);
    const allWeeObjects = await response.json();
    return allWeeObjects;
  } catch (err) {
    console.log(err);
  }
}

export async function getCategory(name = 'Default') {
  try {
    const response = await fetch(`${baseUrl}/models/category/${name}`);
    const categoryWeeObjects = await response.json();
    return categoryWeeObjects;
  } catch (err) {
    console.log(err);
  }
}
