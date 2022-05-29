const crypto = require("crypto");
async function encryption(
	password: string,
	saltRounds = 10
): Promise<
	| { success: true; hash: string; salt: string }
	| { success: false; message: string }
> {
	try {
		const salt = crypto.randomBytes(16).toString("base64");
		console.log(typeof salt);
		const hash = await crypto
			.pbkdf2Sync(password, salt, saltRounds, 64, "sha512")
			.toString("base64");
		return { success: true, hash, salt };
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			return { success: false, message: error.message };
		}
		console.log(error);
		return { success: false, message: "Something went wrong" };
	}
}
export { encryption };
