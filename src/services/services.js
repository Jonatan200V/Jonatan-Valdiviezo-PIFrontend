export const URL = 'https://jonatan-valdiviezo-pi.vercel.app/';
const fetchDogs = async (id = false, value = false) => {
  if (id) {
    const res = await fetch(`${URL}dogs/${id}`);
    const data = await res.json();
    return data;
  }

  if (value === 'temperaments') {
    const res = await fetch(`${URL}${value}`);
    const data = await res.json();
    return data;
  }

  if (value) {
    const res = await fetch(`${URL}dogs?name=${value}`);
    const data = await res.json();
    return data;
  }

  const res = await fetch(`${URL}dogs`);
  const data = await res.json();
  return data;
};
export default fetchDogs;
// if (value === 'dog-database') {
//   const res = await fetch(`${URL}dogs/db`);
//   const data = await res.json();
//   console.log(data);
//   return data;
// }
// if (value === 'dog-api') {
//   const res = await fetch(`${URL}dogs/api`);
//   const data = await res.json();
//   console.log(data);
//   return data;
// }
// if (value === 'all-dog') {
//   const res = await fetch(`${URL}dogs`);
//   const data = await res.json();
//   return data;
// }
