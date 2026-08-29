import { useState } from "react";
import personService from "../services/persons";
const PersonForm = ({ setPersons, persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let found = persons.find((person) => person.name === newName);
    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      personService.create({ name: newName, number: newNumber });
    }
    document.getElementById("name").value = "";
    setNewName("");
    document.getElementById("number").value = "";
    setNewNumber("");
  };
  return (
    <form>
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
  );
};
export default PersonForm;
