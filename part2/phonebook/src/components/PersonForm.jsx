import { useState } from "react";
import personService from "../services/persons";
const PersonForm = ({ setPersons, persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let found = persons.find((person) => person.name === newName);
    if (found !== undefined) {
      if (found.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
      } else {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`,
          )
        ) {
          personService
            .update(found.id, { ...found, number: newNumber })
            .then(() => {
              setPersons(
                persons.map((person) =>
                  person.id === found.id
                    ? { ...person, number: newNumber }
                    : person,
                ),
              );
            })
            .catch(() => {
              alert(
                `Information of ${found.name} has already been removed from server`,
              );
              setPersons(persons.filter((p) => p.id !== found.id));
            });
        }
      }
    } else {
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((data) => setPersons(persons.concat(data)))
        .catch((error) => {
          alert(error.response.data);
        });
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
