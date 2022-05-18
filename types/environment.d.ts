export {}; //Making file a module.

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			MONGODB_URL: string;
		}
	}
}
