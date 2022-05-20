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
async function verifyOTP(req: Request, res: Response) {
	try {
		const { email, otp } = req.body;
		const otpTime = new Date(Date.now() - 1000 * 30); //3 seconds ago
		var user = await User.findOne({ email });
		if (user) {
			if (user.otpCreatedAt && user.otpCreatedAt <= otpTime) {
				return res.status(409).send({
					success: false,
					message: "OTP has been expired. Please request a new one.",
				});
			} else {
				if (user.otp === otp) {
					await User.findOneAndUpdate(
						{ email },
						{ isVerified: true, $unset: { otp: null, otpCreatedAt: null } }
					);
					return res.status(200).send({
						success: true,
						message: "Account verified",
						data: [],
					});
				} else {
					return res.status(409).send({
						success: false,
						message: "OTP is incorrect",
					});
				}
			}
		} else {
			return res
				.status(404)
				.send({ success: false, message: "User not found" });
		}
	} catch (error) {
		customErrorHandler(error, res);
	}
}
export { verifyOTP };
