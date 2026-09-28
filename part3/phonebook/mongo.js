const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);
mongoose.set("strictQuery", false);
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>",
  );
  process.exit(1);
} else if (process.argv.length > 5) {
  console.log(
    "Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>",
  );
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log(
    "Please provide both name and number as arguments: node mongo.js <password> <name> <number>",
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://mohamed20163858_db_user:${password}@cluster0.9hn4uc6.mongodb.net/personApp?appName=Cluster0`;
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then(() => {
    console.log(`Added ${name} with number ${number} to the phonebook`);
    mongoose.connection.close();
  });
}
