import { Response, Request } from "express";
import { customErrorHandler } from "../../helpers/customErrorHandler";
const jwt = require("jsonwebtoken");
import generateJWT from "../../helpers/generateJWT";
//Models
import User from "../../schemas/user/user.model";
import { Chalk } from "../../services/Chalk/chalk.service";
const log = new Chalk();
//@route : /user/private/refresh-token
//@method : GET
//@access : Private
//@desc : Requesting new access token

async function newAccessToken(req: Request, res: Response) {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			console.log(
				"Could not find refresh token while generating new access token so returning 401"
			);
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
			});
		}

		jwt.verify(
			refreshToken,
			process.env.JWT_SECRET,
			async (
				error: Error,
				payload: { _id: string; iat: number; exp: number }
			) => {
				if (error) {
					console.log("Error while verifying refresh token");
					res.clearCookie("refreshToken");
					return res
						.status(401)
						.json({ success: false, message: "Unauthorized" });
				} else {
					const { _id } = payload;
					const userDetails = await User.findById(_id);

					if (!userDetails) {
						console.log(
							"Could not find user while generating new access token"
						);
						res.clearCookie("refreshToken");
						return res
							.status(404)
							.json({ success: false, message: "User not found" });
					}

					const accessToken = generateJWT({ _id: userDetails._id }, "10M");
					return res.status(200).json({
						success: true,
						message: "Regenerated access token",
						data: [
							{
								accessToken,
								name: userDetails.name,
								avatar: userDetails.avatar,
							},
						],
					});
				}
			}
		);
	} catch (error) {
		customErrorHandler(
			error,
			res,
			"newAccessToken",
			`while requesting new access token`
		);
	}
}
export { newAccessToken };
