//Modules, Packages, helpers
import { Response, Request } from "express";
import { customErrorHandler } from "../../helpers/customErrorHandler";
import { otp } from "../../helpers/otpGenerator";
import { encryption } from "../../helpers/encryption";

//Models
import User from "../../schemas/user/user.model";

//@route : /v1/user/signup
//@method : PUT
//@access : Public
//@desc : Signing up a new user

async function signup(req: Request, res: Response) {
	try {
		const { email, password, name, avatar } = req.body;
		let lastUpdate = new Date(Date.now() - 1000 * 60 * 3); //3 minutes ago

		//Generating hash and salt
		let encryptionData = await encryption(password);
		let hash;
		let salt;
		if (!encryptionData.success && encryptionData?.message) {
			throw new Error(encryptionData.message);
		} else if (encryptionData.success) {
			hash = encryptionData.hash;
			salt = encryptionData.salt;
		}

		//Get user by email
		var newUser = await User.findOne({
			email,
		});

		//If user already exists
		if (newUser !== null) {
			//Check if its been more than 3 min since the OTP was sent for verification and if the user is not verified
			if (
				newUser.isVerified === false &&
				newUser.updatedAt &&
				newUser.updatedAt <= lastUpdate
			) {
				//Overrite the user
				await User.findOneAndUpdate(
					{ email },
					{
						name,
						password: {
							hash,
							salt,
						},
						avatar,
					}
				);
			}

			//If user is verified or it hasn't been 3 minutes since last update
			else {
				return res.status(409).json({
					success: false,
					message: "Account already exists",
				});
			}
		} else {
			await User.create({
				email,
				name,
				password: {
					hash,
					salt,
				},
				avatar,
			});
		}

		//Now send OTP to user's email
		//Pending : Send OTP to user's email
		await User.findOneAndUpdate(
			{ email },
			{ otp: otp(), otpCreatedAt: new Date() }
		);
		return res.status(201).json({ success: true, message: "User created" });
	} catch (e) {
		customErrorHandler(e, res, "signup", `while siging up user`);
	}
}
export { signup };
