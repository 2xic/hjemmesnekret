import { Expect } from "./expect/ExpectValue";

export type CallbackFunction = () => void;

function itSkip(name: string, callback: CallbackFunction): void;
function itEach(testOptions: unknown[] | unknown[][]): Function;

declare global {
	function expect(value: unknown): Expect;
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

