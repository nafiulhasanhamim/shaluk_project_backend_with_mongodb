const mongoose = require("mongoose");
const config = require("./config");
const dbURL = config.db.url;
// mongoose.connect(dbURL)
// .then(()=> {
//     console.log("mongodb atlas is connected");
// })
// .catch((error)=> {
//     console.log(error);
//     process.exit(1);
// })

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
