import axios from 'axios';
const apiKey = '43cf289d109f4dba88c16d789ab27720';

axios.get(`https://api.spoonacular.com/recipes/random?number=3&apiKey=${apiKey}`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));