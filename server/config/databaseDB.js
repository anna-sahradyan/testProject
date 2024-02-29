const mongoose = require("mongoose");
const configurationDatabase = async ({ uri, options }) => {
  try {
    await mongoose.connect(uri, options);
    console.log("Connected to the database");
    return mongoose.connections;
  } catch (err) {
    console.error("Error connecting to the database", err);
    throw err;
  }
};
module.exports = configurationDatabase;