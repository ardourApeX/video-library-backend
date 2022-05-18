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
		console.log(chalk.red.bold.bgWhite("----------Error Occured---------"));
		place &&
			console.table([
				{
					"Function Name": functionName,
					"While Doing": place,
					"Error Message": error.message,
				},
			]);
		!place &&
			console.table([
				{
					"Function Name": functionName,
					"Error Message": error.message,
				},
			]);

		console.log(chalk.bgRed.white("Whole Error =>", error));
	}
}
exports.Chalk = Chalk;
