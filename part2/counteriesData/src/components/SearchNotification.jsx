import { useEffect } from "react";
const SearchNotification = ({
  searchTerm,
  setSearchTerm,
  countries,
  setSelectedCountry,
}) => {
  const filteredCountries = countries.filter((country) =>
    country.startsWith(searchTerm.toLowerCase()),
  );
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountries, setSelectedCountry]);

  if (searchTerm === "") {
    return null;
  } else if (filteredCountries.length === 0) {
    return <p>No countries found.</p>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        <ul>
          {filteredCountries.map((country) => (
            <li key={country}>
              {country}{" "}
              <button
                onClick={() => {
                  setSearchTerm(country);
                  setSelectedCountry(country);
                }}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches. specify another filter</p>;
  }
};
export default SearchNotification;
