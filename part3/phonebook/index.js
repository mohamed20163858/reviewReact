const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
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
  Person.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error fetching persons:", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({})
    .then((phonebookList) => {
      res.send(
        `<p>Phonebook has info for ${phonebookList.length} people</p><p>${date}</p>`,
      );
    })
    .catch((error) => {
      console.error("Error fetching persons:", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ message: "Person not found" });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Person not found" });
      }
      console.error("Error fetching person:", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        res.status(200).json({ message: "Person deleted" });
      } else {
        res.status(404).json({ message: "Person not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting person:", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }
  Person.findOne({ name }).then((person) => {
    if (person) {
      return res.status(400).json({ error: "Name must be unique" });
    } else {
      const newPerson = new Person({ name, number });
      newPerson
        .save()
        .then((savedPerson) => {
          res.status(201).json(savedPerson);
        })
        .catch((error) => {
          console.error("Error saving person:", error.message);
          res.status(500).json({ error: "Internal server error" });
        });
    }
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
