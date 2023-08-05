const baseUrl = 'http://localhost:3001';

// NOT USED!
// // Retrieve all objects from the /models route
// export async function getAll() {
//   try {
//     const response = await fetch(`${baseUrl}/models`);
//     const allWeeObjects = await response.json();
//     return allWeeObjects;
//   } catch (err) {
//     console.log(err);
//   }
// }

// Retrieve all objects of the specified
// category from the /models/category route
export async function getCategory(name = 'Default') {
  try {
    const response = await fetch(`${baseUrl}/models/category/${name}`);
    const categoryWeeObjects = await response.json();
    return categoryWeeObjects;
  } catch (err) {
    console.log(err);
  }
}
