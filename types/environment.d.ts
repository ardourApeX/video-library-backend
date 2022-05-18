export {}; //Making file a module.

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
		}
	}
}
