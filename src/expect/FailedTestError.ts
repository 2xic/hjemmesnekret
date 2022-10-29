
export class FailedTestError extends Error {
	constructor(public message: string) {
		super(message);
		this.name = 'FailedTestError';
	}
}
