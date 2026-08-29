const Persons = ({ persons, filterValue }) => {
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase()),
  );
  return (
    <div>
      {filtered.length === 0
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : filtered.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};
export default Persons;
