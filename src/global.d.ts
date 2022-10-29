import { ExpectValue } from "./expect/ExpectValue";

export type CallbackFunction = () => void;

function itSkip(name: string, callback: CallbackFunction): void;
// eslint-disable-next-line @typescript-eslint/ban-types
function itEach(testOptions: unknown[] | unknown[][]): Function;

declare global {
	function expect(value: unknown): ExpectValue;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	expect['objectContaining'] = (value: unknown) => unknown;

	function describe(name: string, callback: CallbackFunction): void;
	describe['skip'] = itSkip;

	function it(name: string, callback: CallbackFunction): void;
	function it(name: string, callback: CallbackFunction): void;
	it['skip'] = itSkip;
	it['skip']['each'] = itEach;
	it['each'] = itEach;


	function beforeEach(callback: CallbackFunction): void;
	function beforeAll(callback: CallbackFunction): void;
}

