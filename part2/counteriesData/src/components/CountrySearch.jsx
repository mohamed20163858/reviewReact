const CountrySearch = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <label htmlFor="country-search">find countries:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        id="country-search"
        placeholder="Search for a country..."
      />
    </div>
  );
};
export default CountrySearch;
