//Packages
const mongoose = require("mongoose");
require("dotenv").config();

//Global Variables
const uri = process.env.MONGODB_URL;

//Connection to MongoDB
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
	console.log("Connection Established sucessfully");
});

module.exports = mongoose;
