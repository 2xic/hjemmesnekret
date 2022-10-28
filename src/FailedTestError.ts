

export class FailedTestError extends Error {
	constructor(){
		super('Test failed');
	    this.name = 'FailedTestError';
	}
}
