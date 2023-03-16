const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://maniteja:kmt12561@cluster0.7hsjxp9.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));
