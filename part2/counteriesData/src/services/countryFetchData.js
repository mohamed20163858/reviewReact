import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api";
const getAllCountries = () =>
  axios
    .get(`${url}/all`)
    .then((response) => response.data)
    .then((data) => data.map((country) => country.name.common.toLowerCase()))
    .catch(() => ["Cannot fetch countries data"]);
const getCountryByName = (name) => axios.get(`${url}/name/${name}`);
export default { getAllCountries, getCountryByName };
