//Modules, Packages, helpers
import { Response, Request } from "express";
import { IUser } from "../../types/user";
import { customErrorHandler } from "../../helpers/customErrorHandler";
import { validatePassword } from "../../helpers/validatePassword";
import generateJWT from "../../helpers/generateJWT";
//Models
import User from "../../schemas/user/user.model";

async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		const userDetails = await User.findOne<IUser>({ email, isVerified: true });
		if (userDetails === null) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
		const { hash, salt } = userDetails.password;
		const isPasswordValid = await validatePassword(password, hash, salt);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid password" });
		}
		const accessToken = generateJWT(
			{ _id: userDetails._id, email: userDetails.email },
			"10M"
		);
		const refreshToken = generateJWT({ _id: userDetails._id }, "7d");
		res.cookie("refreshToken", refreshToken, {
			path: "/cookie",
			sameSite: "strict",
			httpOnly: true,
			secure: true,
		});

		return res.status(200).json({
			success: true,
			message: "Successfully logged in",
			data: [
				{ accessToken, name: userDetails.name, avatar: userDetails.avatar },
			],
		});
	} catch (e) {
		customErrorHandler(e, res, "login", `while loging user`);
	}
}
export { login };
