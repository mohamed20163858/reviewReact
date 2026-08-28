import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase()),
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    let found = persons.find((person) => person.name === newName);
    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    document.getElementById("name").value = "";
    setNewName("");
    document.getElementById("number").value = "";
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with:{" "}
          <input onChange={(e) => setFilterValue(e.target.value)} />
        </div>
        <h4>add a new</h4>
        <div>
          name:{" "}
          <input
            id="name"
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          number:{" "}
          <input
            id="number"
            onChange={(e) => setNewNumber(e.target.value)}
            required
          />
        </div>
        {/* <div>{newName}</div> */}
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

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

export default App;
