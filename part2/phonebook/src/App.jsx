import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
const App = () => {
  const [persons, setPersons] = useState([]);

  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    console.log("effect");

    personService.getAll().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterValue={setFilterValue} />
      <h4>add a new</h4>
      <PersonForm setPersons={setPersons} persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
