import { useEffect, useState } from "react";
import countryFetchData from "../services/countryFetchData.js";
import weatherFetchData from "../services/weatherData.js";
import weatherInfo from "../helpers/weatherInfo.js";
const CountryInfo = ({ selectedCountry }) => {
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    if (selectedCountry) {
      // Fetch country data
      countryFetchData
        .getCountryByName(selectedCountry)
        .then((response) => {
          setCountryData(response.data);
          // console.log(selectedCountry);
          return response.data;
        })
        .then((countryInfo) => {
          // Fetch weather data for the selected country
          if (countryInfo.latlng) {
            const [latitude, longitude] = countryInfo.latlng;
            weatherFetchData
              .getWeatherData(latitude, longitude)
              .then((weatherResponse) => {
                setWeatherData(weatherResponse.data.current);
              });
          }
        });
    }
  }, [selectedCountry]);

  return (
    <div>
      {countryData && selectedCountry && (
        <div>
          <h2>{countryData.name.common}</h2>
          <p>Capital: {countryData.capital}</p>
          <p>Area: {countryData.area}</p>
          <p>Latitude: {countryData.latlng[0]}</p>
          <p>Longitude: {countryData.latlng[1]}</p>
          <h2>Languages:</h2>
          <ul>
            {Object.values(countryData.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            style={{ width: "200px" }}
            src={countryData.flags.svg}
            alt={`Flag of ${countryData.name.common}`}
          />
          {weatherData && (
            <div>
              <h2>Weather Information:</h2>
              <p>Temperature: {weatherData.temperature_2m}°C</p>
              <p>Wind Speed: {weatherData.wind_speed_10m} km/h</p>
              <p>
                Icon:{" "}
                {weatherInfo(weatherData.weather_code, weatherData.is_day).icon}
              </p>
              <p>
                Weather:{" "}
                {
                  weatherInfo(weatherData.weather_code, weatherData.is_day)
                    .description
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CountryInfo;
