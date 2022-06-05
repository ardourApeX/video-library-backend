const jwt = require("jsonwebtoken");
export default function generateJWT(
	payload: Object,
	expiresIn: string = "1d"
): string {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
}
