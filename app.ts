"use strict";
require("./database/mongoConnection"); //Mongoose connection
const express = require("express");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const { Chalk } = require("./services/Chalk/chalk.service");
import { NextFunction, Request, Response } from "express";
const cors = require("cors");
//Routes
import { routes as userRoutes } from "./routes/v1/index.routes";

// Variables
const PORT: number = Number(process.env.PORT) || 8000;
const log = new Chalk();

//Configuring Express
const app = express();

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
