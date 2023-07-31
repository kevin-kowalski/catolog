const baseUrl = 'http://localhost:3001';

export function getCategory(name = 'Default') {
  return fetch(`${baseUrl}/models/category/${name}`)
    .then(async (response) => {
      const catData = await response.json();
      return catData;
    })
    .catch((e) => console.log(e));
}
