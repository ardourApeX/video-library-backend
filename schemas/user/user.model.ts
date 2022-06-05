import { Schema, model } from "mongoose";
import { IUser } from "../../types/user";
interface IUserModel extends IUser, Document {}

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required for User"],
		},
		email: {
			type: String,
			unique: [true, "Email already exists"],
			required: [true, "Email is required for User"],
		},
		avatar: {
			type: String,
			default:
				"https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o=",
		},
		password: {
			hash: {
				type: String,
				required: [true, "Password is required for User"],
			},
			salt: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		otp: {
			type: Number,
		},
		otpCreatedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

export interface HookNextFunction {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(error?: Error): any;
}

//Middleware
userSchema.post(
	"save",
	function (error: any, doc: IUser, next: HookNextFunction) {
		if (error.name === "MongoServerError" && error.code === 11000) {
			const duplicateKeys = Object.keys(error.keyValue);
			return next(new Error(`${duplicateKeys.join(" ")} must be unique`));
		}
		return next(error);
	}
);

const User = model<IUserModel>("User", userSchema);

export default User;
