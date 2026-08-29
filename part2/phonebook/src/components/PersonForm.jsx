import { useState } from "react";
import personService from "../services/persons";
const PersonForm = ({ setPersons, persons, setMessage, setErrorBoolean }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Name and number cannot be empty");
      return;
    }
    for (let i = 0; i < newNumber.length; i++) {
      if (isNaN(newNumber[i]) && newNumber[i] !== "-") {
        alert("Number can only contain digits and hyphens");
        return;
      }
    }
    const consistentName = newName
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    let found = persons.find((person) => person.name === consistentName);
    if (found !== undefined) {
      if (found.number === newNumber) {
        alert(`${consistentName} is already added to phonebook`);
      } else {
        if (
          window.confirm(
            `${consistentName} is already added to phonebook, replace the old number with a new one?`,
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
              setMessage(`Updated ${found.name}'s number to ${newNumber}`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch(() => {
              setErrorBoolean(true);
              setMessage(
                `Information of ${found.name} has already been removed from server`,
              );
              setTimeout(() => {
                setMessage(null);
                setErrorBoolean(false);
              }, 5000);

              setPersons(persons.filter((p) => p.id !== found.id));
            });
        }
      }
    } else {
      personService
        .create({
          name: consistentName,
          number: newNumber,
        })
        .then((data) => {
          setPersons(persons.concat(data));
          setMessage(`Added ${consistentName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorBoolean(true);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
            setErrorBoolean(false);
          }, 5000);
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
