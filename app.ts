"use strict";
const express = require("express");
import { Request, Response } from "express";
const { Chalk } = require("./services/Chalk/chalk.service");
require("./database/mongoConnection");
const app = express();

// Setting Port
const PORT: number = Number(process.env.PORT) || 8000;
//Global Variables
const log = new Chalk();

//@route : /
//@desc : Hello World
//@access : Public
app.get("/", (request: Request, response: Response) => {
	response.status(200).send("I am alive!");
});

//LISTENING ON PORT
app.listen(PORT, () => {
	log.info({
		functionName: "App",
		message: `The application is listening on port ${PORT}!`,
	});
});
