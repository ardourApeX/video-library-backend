//Packages and Modules
import { Chalk } from "../services/Chalk/chalk.service";
import { Response } from "express";

//Variables
const log = new Chalk();
function customErrorHandler(
	error: unknown,
	res: Response,
	functionName?: string,
	place?: string
) {
	if (error instanceof Error) {
		log.error({
			error,
			functionName,
			place,
		});
		return res.status(500).send({ success: false, message: error.message });
	} else {
		log.error({
			error: String(error),
			place: functionName,
		});
		return res.status(500).send({ success: false, message: String(error) });
	}
}
export { customErrorHandler };
