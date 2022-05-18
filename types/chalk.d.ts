type Info = {
	message: string;
	functionName?: string;
};

type IError = {
	error: Error;
	place?: string;
	functionName?: string;
};
export { Info, IError };
