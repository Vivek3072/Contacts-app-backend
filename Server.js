const express = require("express");
const dotenv = require("dotenv").config();

const ContactRoutes = require("./routes/ContactRoutes");
const errorHandler = require("./middleware/ErrorHandler");
const connectDb = require("./config/DBConnection");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE is used because whenever we need to accept data from the client to our server we need to use a body parser so that we can parse the stream of the data that we are receiving from the client
// IF we don't use middleware then the request body will be undefined
// Middleware provided by express for the json object 
app.use(express.json());

app.use("/api/contacts", ContactRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});

// console.log("heloo",port);
 