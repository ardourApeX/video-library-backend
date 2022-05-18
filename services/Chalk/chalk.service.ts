//Packages
const chalk = require("chalk");

//Interfaces
import { IError, Info } from "../../types/chalk";

class Chalk {
	info({ message, functionName }: Info) {
		console.log(
			functionName &&
				chalk.gray.bold.bgWhite("Function Name => " + functionName + " :") +
					chalk.black.bold.bgWhite(" " + message + " ")
		);
	}
	error({ error, place, functionName }: IError) {
		console.log(chalk.red.bold.bgWhite("\n----------Error Occured---------"));
		place && console.log(chalk.red.bold("While doing -> ") + place);
		functionName &&
			console.log(chalk.red.bold("Function Name -> ") + functionName);
		if (typeof error === "string") {
			console.log(chalk.red.bold.bgWhite("Error Message -> ") + error);
		} else {
			console.log(chalk.red.bold("Error Message -> ") + error.message);
		}

		console.log(chalk.red.bold.bgWhite("---------------------------------"));
	}
}
export { Chalk };
