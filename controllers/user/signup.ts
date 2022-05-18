//Modules and Packages
import { Response, Request } from "express";
import { customErrorHandler } from "../../helpers/customErrorHandler";

//Models
import User from "../../schemas/user/user.model";

//@route : /v1/user/signup
//@method : POST
//@access : Public
//@desc : Signing up a new user
async function signup(req: Request, res: Response) {
	try {
		const { email, password: hash, name } = req.body;
		const newUser = await User.create({
			name,
			email,
			password: {
				hash,
				salt: "",
			},
		});

		return res
			.status(200)
			.send({ success: true, message: "its working", data: newUser });
	} catch (e) {
		customErrorHandler(e, res, "signup", `while siging up user`);
	}
}
export { signup };
