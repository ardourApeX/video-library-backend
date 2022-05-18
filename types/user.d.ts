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
}

interface ISignup {
	name: string;
	email: string;
	password: string;
	avatar?: string;
}

export { IUser, ISignup };
