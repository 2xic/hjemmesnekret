import { ExpectValue } from "./expect/ExpectValue";
import FakeTimers from "@sinonjs/fake-timers";
import { MockFunctions } from "./utils/MockFunction";

export type CallbackFunction = () => void;

function itSkip(name: string, callback: CallbackFunction): void;
// eslint-disable-next-line @typescript-eslint/ban-types
function itEach(testOptions: unknown[] | unknown[][]): Function;

declare global {
  function expect(value: unknown): ExpectValue;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expect["objectContaining"] = (value: unknown) => unknown;

  function describe(name: string, callback: CallbackFunction): void;
  describe["skip"] = itSkip;

  function it(name: string, callback: CallbackFunction): void;
  function it(name: string, callback: CallbackFunction): void;
  it["skip"] = itSkip;
  it["skip"]["each"] = itEach;
  it["each"] = itEach;

  // eslint-disable-next-line no-var
  var clock: FakeTimers.InstalledClock | undefined;

  function beforeEach(callback: CallbackFunction): void;
  function beforeAll(callback: CallbackFunction): void;
  function afterAll(callback: CallbackFunction): void;

  function test(name: string, callback: CallbackFunction): void;

  // eslint-disable-next-line no-var
  var jest: {
    useFakeTimers: (...args: unknown[]) => {
      setSystemTime: (time: Date) => void;
    },
    useRealTimers: () => void,
    fn: () => MockFunctions,
    // eslint-disable-next-line @typescript-eslint/ban-types
    spyOn: (object: Object, field: string) => {
      mockReturnValue: (value: any) => void,
      mockRestore: () => void,
    },
  }
}
