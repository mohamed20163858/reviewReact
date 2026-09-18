import CountrySearch from "./components/CountrySearch.jsx";
import CountryInfo from "./components/CountryInfo.jsx";
import { useState, useEffect } from "react";
import countryFetchData from "./services/countryFetchData.js";
import SearchNotification from "./components/SearchNotification.jsx";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    countryFetchData.getAllCountries().then((data) => setCountries(data));
  }, []);

  return (
    <div>
      <CountrySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchNotification
        searchTerm={searchTerm}
        countries={countries}
        setSelectedCountry={setSelectedCountry}
      />
      <CountryInfo selectedCountry={selectedCountry} />
    </div>
  );
};
export default App;
