interface IUser {
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
	otp?: number;
	otpCreatedAt?: Date;
}

interface ISignup {
	name: string;
	email: string;
	password: string;
	avatar?: string;
}

export { IUser, ISignup };
