"use strict";
require("./database/mongoConnection"); //Mongoose connection
const express = require("express");
import { Request, Response } from "express";
import { routes as userRoutes } from "./routes/v1/index.routes";
const bodyParser = require("body-parser");
const { Chalk } = require("./services/Chalk/chalk.service");

// Variables
const PORT: number = Number(process.env.PORT) || 8000;
const log = new Chalk();

//Configuring Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//------------Mounting Routes------------

// User Controllers
app.use("/v1", userRoutes);

//@route : /
//@desc : Testing Route
//@access : Public
app.use("/", (request: Request, response: Response) => {
	response.status(200).send("I am alive!");
});

//LISTENING ON PORT
app.listen(PORT, () => {
	log.info({
		functionName: "App",
		message: `The application is listening on port ${PORT}!`,
	});
});
