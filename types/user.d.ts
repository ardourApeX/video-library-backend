import { ObjectId } from "mongoose";

interface IUser {
	_id: ObjectId;
	name: string;
	email: {
		type: string;
		unique: boolean;
		required: boolean;
	};
	avatar?: string;
	password: {
		hash: string;
		salt: string;
	};
	isVerified?: boolean;
	updatedAt: Date;
	createdAt: Date;
	otp: number | null;
	otpCreatedAt: Date | null;
}

interface ISignup {
	name: string;
	email: string;
	password: string;
	avatar?: string;
}

export { IUser, ISignup };
