import PersonRow from "./PersonRow";
const Persons = ({ persons, filterValue }) => {
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <div>
      {filtered.length === 0
        ? persons.map((person) => (
            <PersonRow key={person.name} person={person} />
          ))
        : filtered.map((person) => (
            <PersonRow key={person.name} person={person} />
          ))}
    </div>
  );
};
export default Persons;
