/* eslint-disable @typescript-eslint/ban-types */
import { CallbackFunction } from "./global";
import { HappyLog, SadLog, YellowColorLog } from "./utils/Logger";

export class TestContainer {
  private tests: Array<Test> = [];

  private afterAll: () => void | Promise<void> = () => undefined;

  private beforeAll: () => void | Promise<void> = () => undefined;

  private beforeEach: () => void | Promise<void> = () => undefined;

  private describes: Array<Describe> = [];

  private _failures: Array<Failure> = [];

  private testResults = {
    success: 0,
    skip: 0,
    failed: 0,
  }

  public clear() {
    this.describes = [];
    this.tests = [];
    this.testResults = {
      success: 0,
      skip: 0,
      failed: 0,
    }
    this._failures = [];
    return this;
  }

  public setup(name: string, describe: () => void | Promise<void>, skip = false) {

    this.describes.push({
      name, describe,
      skip,
    });

    return this;
  }

  private info: string[] = [];

  public async run(): Promise<string[]> {
    this.info = [];
    return (async (): Promise<string[]> => {
      let prevTestCountLocation = 0;
      for (const { name, describe, skip } of this.describes) {
        this.info.push(`${name}`)
        if (skip) {
          await describe();
          this.testResults.skip += (this.tests.length - prevTestCountLocation);
        } else {
          await describe();
          await this.beforeAll();
          await this.runTests({ tests: this.tests.slice(prevTestCountLocation) });
          await this.afterAll();
        }
        prevTestCountLocation = this.tests.length;
      }
      if (this.describes.length === 0 && this.tests.length) {
        await this.runTests({ tests: this.tests });
      }
      return this.info;
    })();
  }

  private async runTests({ tests }: { tests: Array<Test> }) {
    for (const { name, test, skip } of tests) {
      if (skip) {
        this.info.push(YellowColorLog(`\tSKIPPED - ${name}`));
        this.testResults.skip += 1;
        continue;
      }
      await this.beforeEach();
      try {
        const err = await Promise.resolve(test()).catch((err: Object) => {
          return err;
        });
        if (err) {
          this.info.push(SadLog(`\tFAILED - ${name}`));
          this.testResults.failed += 1;
          this._failures.push({
            context: [name],
            message: err,
          })
        } else {
          this.info.push(HappyLog(`\tOK - ${name}`));
          this.testResults.success += 1;
        }
      } catch (err: any) {
        this.info.push(SadLog(`\tFAILED - ${name}`));
        this.testResults.failed += 1;
        this._failures.push({
          context: [name],
          message: err,
        })
        continue;
      }
    }
  }

  /*
    TODO: this should be inside a describe,
  */
  public registerBeforeAll(callback: () => void) {
    this.beforeAll = callback;
  }

  /*
    TODO: this should be inside a describe
  */
    public registerBeforeEach(callback: () => void) {
    this.beforeEach = callback;
  }

  /*
    TODO: this should be inside a describe
  */
    public registerAfterAll(callback: CallbackFunction) {
    this.afterAll = callback;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addTest(name: string, test: () => any | Promise<any>, skip = false) {
    this.tests.push({
      name, test, skip
    });
  }

  public get skip() {
    return this.testResults.skip;
  }

  public get success() {
    return this.testResults.success;
  }

  public get failed() {
    return this.testResults.failed;
  }

  public get testCount() {
    return this.tests.length;
  }

  public get failures(): Readonly<Failure[]> {
    return this._failures;
  }
}

type Callback = () => void | Promise<void>;

interface Test {
  name: string;
  test: Callback;
  skip: boolean;
}

interface Describe {
  name: string;
  describe: Callback;
  skip: boolean;
}

export interface Failure {
  context: string[],
  message: Error | Object;
}
