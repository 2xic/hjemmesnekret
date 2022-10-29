export type CallbackFunction = () => void;
import {
  expect as globalExpect,
  describe as globalDescribe,
  it as globalIt,
  beforeEach as globalBeforeEach,
} from "./globals";

declare global {
  const expect = globalExpect;
  const describe = globalDescribe;
  const it = globalIt;
  const beforeEach = globalBeforeEach;

  it.each = (testOptions: unknown[] | unknown[][]) => {
    return MakeCallable(testOptions, testContainer);
    //  return () => undefined;
  };

  /*
	// @ts-ignore
	global.describe = describe;
	// @ts-ignore
	global.describe.skip = () => undefined;
	// @ts-ignore
	global.beforeEach = beforeEach;
	// @ts-ignore
	global.beforeAll = beforeAll;
	// @ts-ignore
	global.it = it;
	// @ts-ignore
	global.it.skip = () => undefined;
	// @ts-ignore
	global.it.skip.each = () => {
	  return () => undefined;
	};
	// @ts-ignore
	// @ts-ignore
	global.expect = expect;
	// @ts-ignore
	global.expect.objectContaining = Expect.objectContaining;
	*/

  /*
	type beforAll = (callback: CallbackFunction) => void;
	type it = (name: string, callback: CallbackFunction)  => void;
	type expect = (value: unknown) => void;
	type describe = (name: string, callback: CallbackFunction) => void;
	*/
}
