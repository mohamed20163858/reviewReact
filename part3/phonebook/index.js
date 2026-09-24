const phonebookList = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const express = require("express");
const morgan = require("morgan");
morgan.token("reqPayload", function (req, res) {
  if (req.method === "POST" && req.body) {
    return `{name: ${req.body.name}, number: ${req.body.number}}`;
  } else {
    return "";
  }
});
const app = express();
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.reqPayload(req, res),
    ].join(" ");
  }),
);
app.use(express.static("dist"));
const port = process.env.PORT || 3001;
app.get("/api/persons", (req, res) => {
  res.json(phonebookList);
});
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${phonebookList.length} people</p><p>${date}</p>`,
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebookList.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personIndex = phonebookList.findIndex((person) => person.id === id);
  if (personIndex !== -1) {
    phonebookList.splice(personIndex, 1);
    res.status(200).json({ message: "Person deleted" });
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }
  const existingPerson = phonebookList.find((person) => person.name === name);
  if (existingPerson) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const id = Math.floor(Math.random() * 1000000).toString();
  const newPerson = { id, name, number };
  phonebookList.push(newPerson);
  res.status(201).json(newPerson);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
