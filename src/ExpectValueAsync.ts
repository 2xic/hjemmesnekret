
import { Expect } from "./ExpectValue";

export class ExpectValueAsync extends Expect {
  constructor(protected value: unknown) {
    super(value);
  }

  public async toBeTruthy(): Promise<void> {
    await this.resolvePromise();
    super.toBeTruthy();
  }
  public async toHaveLength(length: number): Promise<void> {
    await this.resolvePromise();
    super.toHaveLength(length);
  }
  public async toBeInstanceOf(truth: new () => unknown): Promise<void> {
    await this.resolvePromise();
    super.toBeInstanceOf(truth);
  }
  public async toBe(value: unknown): Promise<void> {
    await this.resolvePromise();
    super.toBe(value);
  }
  public async toStrictEqual(value: unknown): Promise<void> {
    await this.resolvePromise();
    super.toStrictEqual(value);
  }
  public async toMatchInlineSnapshot(value: unknown): Promise<void> {
    await this.resolvePromise();
    super.toMatchInlineSnapshot(value);
  }
  public toBeDefined(): Promise<void> {
    console.log('async - "Method not implemented - toBeDefined."');
    throw new Error("Method not implemented.");
  }
  public toBeUndefined(): Promise<void> {
    console.log('async - "Method not implemented - toBeUndefined."');
    throw new Error("Method not implemented.");
  }
  public toBeLessThan(value: number): Promise<void> {
    console.log('async - "Method not implemented - toBeLessThan."');
    throw new Error("Method not implemented.");
  }
  public toBeLessThanOrEqual(value: number): Promise<void> {
    console.log('async - "Method not implemented - toBeLessThanOrEqual."');
    throw new Error("Method not implemented.");
  }
  public toBeGreaterThanOrEqual(value: number): Promise<void> {
    console.log('async - "Method not implemented - toBeGreaterThanOrEqual."');
    throw new Error("Method not implemented.");
  }
  public toBeGreaterThan(value: number): Promise<void> {
    console.log('async - "Method not implemented - toBeGreaterThan."');
    throw new Error("Method not implemented.");
  }
  public toContain(value: string): Promise<void> {
    console.log('async - "Method not implemented - toContain."');
    throw new Error("Method not implemented.");
  }
  public toContainEqual(value: Record<string, unknown>): Promise<void> {
    console.log('async - "Method not implemented - toContainEqual."');
    throw new Error("Method not implemented.");
  }
  public toEqual(value: unknown): Promise<void> {
    console.log('async - "Method not implemented - toEqual."');
    throw new Error("Method not implemented.");
  }
  public toBeFalsy(): Promise<void> {
    console.log('async - "Method not implemented - toBeFalsy."');
    throw new Error("Method not implemented.");
  }
  public async toThrowError(): Promise<void> {
    await this.resolvePromise();
    super.toThrowError();
  }

  public async toThrow(): Promise<void> {
    await this.resolvePromise();
    super.toThrowError();
  }

  private async resolvePromise() {
    this.value = await Promise.resolve(this.value).catch((err) => {
        //console.log(err);
    });
  }
}
