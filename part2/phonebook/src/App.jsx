import "./index.css";
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorBoolean, setErrorBoolean] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    console.log("effect");

    personService.getAll().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorBoolean={errorBoolean} />
      <Filter setFilterValue={setFilterValue} />
      <h4>add a new</h4>
      <PersonForm
        setPersons={setPersons}
        persons={persons}
        setMessage={setMessage}
        setErrorBoolean={setErrorBoolean}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filterValue={filterValue}
        setMessage={setMessage}
        setErrorBoolean={setErrorBoolean}
      />
    </div>
  );
};

export default App;
