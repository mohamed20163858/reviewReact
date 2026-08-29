import personService from "../services/persons";
const PersonRow = ({ person }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.destroy(person.id);
    }
  };
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </p>
  );
};
export default PersonRow;
