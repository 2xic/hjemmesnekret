import { HappyLog, SadLog } from "./Logger";

export class TestContainer {
  private tests: Array<[string, () => any | Promise<any>]> = [];

  private beforeAll: () => void | Promise<void> = () => undefined;

  private beforeEach: () => void | Promise<void> = () => undefined;

  private describe: () => void | Promise<void> = () => undefined;

  private describes: Array<[string, Callback]> = [];

  public clear(){
    this.describes = [];
    this.tests = [];
    return this;
  }

  public setup(name: string, describe: () => void | Promise<void>) {

    this.describes.push([name, describe]);

    return this;
  }

  private info:string[] = [];

  public async run(): Promise<string[]> {
    this.info = [];
    return (async (): Promise<string[]> => {
      for (const [name, describe] of this.describes) {
        this.info.push(`${name}`)
        await describe();
        await this.beforeAll();
        await this.runTests({tests: this.tests});
      }
      if (this.describes.length === 0 && this.tests.length) {
        await this.runTests({tests: this.tests});
      }
      return this.info;
    })();
  }

  private async runTests( {tests} : {tests:  Array<[string, () => any | Promise<any>]>}) {
    for (const [name, test] of tests) {
        //  console.log(test);
        await this.beforeEach();
        try {
          const err = await Promise.resolve(test()).catch(() => {
        //    console.log('failed')
            return true;
          })
          if (err) {
            this.info.push(SadLog(`\tFAILED - ${name}`));
          } else {
            this.info.push(HappyLog(`\tOK - ${name}`));
          }
        } catch (err) {
         // console.log(err);
          this.info.push(SadLog(`\tFAILED - ${name}`));
          continue;
        }
      }
  }


  public registerBeforeAll(callback: () => void) {
    this.beforeAll = callback;
  }

  public registerBeforeEach(callback: () => void) {
    this.beforeEach = callback;
  }

  public addTest(name: string, test: () => any | Promise<any>) {
    this.tests.push([name, test]);
  }

  public get testCount(){
    return this.tests.length;
  }
}

type Callback = () => void | Promise<void>;
