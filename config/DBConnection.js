// Mongoose is an object model design schema which helps us to connect to our mongoDB database
const mongoose = require("mongoose");
var colors = require("colors");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected:- ".bgMagenta);
    console.log("Connection host : ".rainbow, connect.connection.host);
    console.log("Database name : ".rainbow, connect.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
