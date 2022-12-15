const weight = ['0-20', '20-40', '40-60', '60-80', '80-100', '100'];
const orderAlpha = ['a-z', 'z-a'];
const dogApiDb = [
  {
    name: 'all-dog',
    value: 'All Dog',
  },
  {
    name: 'dog-api',
    value: 'Dog Api',
  },
  {
    name: 'dog-database',
    value: 'Dog Database',
  },
];
const imageDefault =
  'https://cdn5.vectorstock.com/i/1000x1000/95/24/pug-purebred-dog-sitting-in-side-view-with-shadow-vector-22179524.jpg';
const expresiones = {
  name: /^[a-zA-Z\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  passHW: /^[0-9]{1,3}-[0-9]{1,3}$/, // 4 a 12 digitos.
  passA: /^[0-9]{1,2}-[0-9]{1,2}$/,
};

export { weight, orderAlpha, dogApiDb, imageDefault, expresiones };
