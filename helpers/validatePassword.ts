const crypto = require("crypto");
async function validatePassword(
	userPassword: string,
	savedHash: string,
	savedSalt: string,
	saltRounds = 10
) {
	return (
		savedHash ==
		(await crypto
			.pbkdf2Sync(userPassword, savedSalt, saltRounds, 64, "sha512")
			.toString("base64"))
	);
}
export { validatePassword };
