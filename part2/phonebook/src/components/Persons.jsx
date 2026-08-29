import personService from "../services/persons";

const Persons = ({
  persons,
  setPersons,
  filterValue,
  setMessage,
  setErrorBoolean,
}) => {
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase()),
  );
  const filteredNames = filtered.length === 0 ? persons : filtered;
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .destroy(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setMessage(`Deleted ${person.name}'s number from phonebook`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setErrorBoolean(true);
          setMessage(
            `Information of ${person.name} has already been removed from server`,
          );
          setTimeout(() => {
            setMessage(null);
            setErrorBoolean(false);
          }, 5000);
        });
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
