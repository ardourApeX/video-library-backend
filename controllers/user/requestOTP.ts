//Modules, Packages
import { Response, Request } from "express";
import { customErrorHandler } from "../../helpers/customErrorHandler";
import { otp } from "../../helpers/otpGenerator";

//Models
import User from "../../schemas/user/user.model";

//@route : /v1/user/requestOtp?email=
//@method : POST
//@access : Public
//@desc : Requesting new OTP for user
async function requestOTP(req: Request, res: Response) {
	try {
		const { email } = req.query;

		// Pending : Sending OTP to user's email
		await User.findOneAndUpdate(
			{ email },
			{ otp: otp(), otpCreatedAt: new Date() }
		);
		return res.status(200).json({ success: 200, message: "OTP Sent" });
	} catch (error) {
		customErrorHandler(error, res);
	}
}
export { requestOTP };
