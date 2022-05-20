const bcrypt = require("bcrypt");
async function encryption(password: string, saltRounds = 10) {
	try {
		const salt: string = await bcrypt.genSalt(saltRounds);
		console.log("salt ", salt);
		const encryptedData: string = await bcrypt.hash(password, salt);
		return { success: true, hash: encryptedData, salt };
	} catch (error) {
		return { success: false, error };
	}
}
export { encryption };
