export class TestContainer {
  private tests: Array<[string, () => any | Promise<any>]> = [];

  private beforeAll: () => void | Promise<void> = () => undefined;

  private beforeEach: () => void | Promise<void> = () => undefined;

  private describes: Array<Callback> = [];

  public setup(_name: string, describe: () => void | Promise<void>) {
    this.describes.push(describe);

    return this;
  }

  public async run(): Promise<string[]> {
    return (async (): Promise<string[]> => {
      const info: string[] = [];
      for (const describe of this.describes) {
        await describe();
        await this.beforeAll();
        for (const [name, test] of this.tests) {
          //  console.log(test);
          await this.beforeEach();
          try {
            await test();
          } catch (err) {
            console.log(`${name} failed`);
            throw err;
          }
          info.push(`OK - ${name}`);
        }
      }
      return info;
    })();
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
}

type Callback = () => void | Promise<void>;
