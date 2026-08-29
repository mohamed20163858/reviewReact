const Filter = ({ setFilterValue }) => {
  return (
    <div>
      filter shown with:{" "}
      <input onChange={(e) => setFilterValue(e.target.value)} />
    </div>
  );
};
export default Filter;
