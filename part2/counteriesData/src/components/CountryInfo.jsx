import { useEffect, useState } from "react";
import countryFetchData from "../services/countryFetchData.js";
const CountryInfo = ({ selectedCountry }) => {
  const [countryData, setCountryData] = useState(null);
  useEffect(() => {
    if (selectedCountry) {
      // Fetch country data
      countryFetchData.getCountryByName(selectedCountry).then((response) => {
        setCountryData(response.data);
      });
    }
  }, [selectedCountry]);

  if (selectedCountry === null) {
    return null;
  }
  return (
    <div>
      {countryData && (
        <div>
          <h2>{countryData.name.common}</h2>
          <p>Capital: {countryData.capital}</p>
          <p>Area: {countryData.area}</p>
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
        </div>
      )}
    </div>
  );
};
export default CountryInfo;
