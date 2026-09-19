import axios from "axios";
const url = "https://api.open-meteo.com/v1/forecast";
const getWeatherData = (latitude, longitude) =>
  axios.get(
    `${url}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code,is_day`,
  );
export default { getWeatherData };
