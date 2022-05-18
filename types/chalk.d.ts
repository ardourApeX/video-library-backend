type Info = {
	message: string;
	functionName?: string;
};

type IError = {
	error: Error | string;
	place?: string;
	functionName?: string;
};
export { Info, IError };
