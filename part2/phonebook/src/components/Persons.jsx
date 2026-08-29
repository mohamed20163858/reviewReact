import personService from "../services/persons";

const Persons = ({ persons, setPersons, filterValue }) => {
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase()),
  );
  const filteredNames = filtered.length === 0 ? persons : filtered;
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.destroy(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  return (
    <div>
      {filteredNames.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        );
      })}
    </div>
  );
};
export default Persons;
