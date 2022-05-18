//Modules, Packages
import { Response, Request } from "express";
import { customErrorHandler } from "../../helpers/customErrorHandler";
import { otp } from "../../helpers/otpGenerator";

//Models
import User from "../../schemas/user/user.model";

//@route : /v1/user/signup
//@method : POST
//@access : Public
//@desc : Signing up a new user
async function signup(req: Request, res: Response) {
	try {
		const { email, password: hash, name, avatar } = req.body;
		let lastUpdate = new Date(Date.now() - 1000 * 60 * 3); //3 minutes ago
		var newUser = null;

		//Check if account already exists and isn't verified yet
		newUser = await User.findOne({
			email,
		});

		//If user already exists
		if (newUser !== null) {
			//Check if user is already verified or been a while since last update
			if (
				newUser.isVerified === false &&
				newUser.updatedAt &&
				newUser.updatedAt <= lastUpdate
			) {
				newUser = await User.findOneAndUpdate(
					{ email },
					{
						name,
						password: {
							hash,
							salt: "",
						},
						avatar,
						//Remove otp otherwise it will be sent to user
						$unset: {
							otp: null,
							otpCreatedAt: null,
						},
					},
					{
						new: true,
					}
				);
			}

			//If user is verified or it hasn't been 3 minutes since last update
			else {
				return res.status(409).send({
					success: false,
					message: "Account already exists",
					data: [],
				});
			}
		}
		//If account doesn't exist, create new one
		else {
			newUser = await User.create({
				email,
				name,
				password: {
					hash,
					salt: "",
				},
				avatar,
			});
		}

		//Now send OTP to user's email
		//Pending : Send OTP to user's email
		await User.findOneAndUpdate(
			{ email },
			{ otp: otp, otpCreatedAt: new Date() }
		);
		return res
			.status(201)
			.send({ success: true, message: "User created", data: newUser });
	} catch (e) {
		customErrorHandler(e, res, "signup", `while siging up user`);
	}
}
export { signup };
