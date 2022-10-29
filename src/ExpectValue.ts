import BigNumber from "bignumber.js";
import { deepEqual } from "./deepEqual";
import { AbstractExpect } from "./Expect";
//import { ExpectValueAsync } from './ExpectValueAsync';
import { FailedTestError } from "./FailedTestError";

/*
- TODO: clean this up
    - it could probably be moved over to Expect and have it just resolve.
    - or move all the checking logic to be in an other class.
*/
export class Expect extends AbstractExpect<
  void | Promise<void> | AbstractExpect<any>
> {

  constructor(protected value: unknown) {
    super(value);
    const val = this.value;
    if (typeof val === 'function') {
      try {
        this.value = val();
      } catch (err) {
        this.value = err;
      }
    }
  }

  public toBeTruthy() {
    this.throwIfFalsy(!!this.value, true);
  }

  public toHaveLength(length: number) {
    const arrayLikeType = this.value as {length?:number};
    if (typeof arrayLikeType.length == 'number') {
      this.throwIfFalsy(arrayLikeType.length === length, length);
    } else {
      this.throwIfFalsy(false, -1);
    }
  }

  public toBeInstanceOf(truth: new () => unknown) {
    // this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value instanceof truth, truth);
  }

  public toBe(value: unknown) {
    // this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value === value, value);
  }

  public toStrictEqual(value: unknown) {
    // this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tostrictequalvalue
    // TODO
    throw new Error("todo");
  }

  public toMatchInlineSnapshot(value: unknown) {
    // this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tomatchinlinesnapshotpropertymatchers-inlinesnapshot
    // TODO
    throw new Error("todo");
  }

  public toBeDefined() {
    // this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tobedefined
    this.throwIfFalsy(this.value !== undefined, undefined);
  }

  public toBeUndefined() {
    // this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value === undefined, undefined);
  }

  public toBeLessThan(value: number) {
    // this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tobedefined
    this.throwIfFalsy((this.value as number) < value, value);
  }

  public toBeLessThanOrEqual(value: number) {
    // this.value = await Promise.resolve(this.value, value);
    this.throwIfFalsy((this.value as number) <= value, value);
  }

  public toBeGreaterThanOrEqual(value: number) {
    // this.value = await Promise.resolve(this.value, value);
    this.throwIfFalsy((this.value as number) >= value, value);
  }

  public toBeGreaterThan(value: number) {
    // this.value = await Promise.resolve(this.value, value);
    this.throwIfFalsy((this.value as number) > value, value);
  }

  public toContain(value: string) {
    // this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(
      typeof this.value === "string" && this.value.includes(value),
      value
    );
  }

  public toContainEqual(value: Record<string, unknown>) {
    const listValue = Array.isArray(this.value) ? this.value : [this.value];
    if (typeof listValue[0] === "object") {
      const results: boolean[] = [];
      for (const listItem of listValue) {
        Object.entries(value).forEach(([key, value]: [string, unknown]) => {
          results.push(
            typeof listItem === "object" &&
              value === (listItem as Record<string, unknown>)[key]
          );
        });
      }
      this.throwIfFalsy(results.includes(true), value);
    } else {
      this.throwIfFalsy(this.isFalsy, {});
    }
  }

  static objectContaining(value: unknown) {
    return value;
  }

  public toEqual(value: unknown) {
    if (BigNumber.isBigNumber(value) && BigNumber.isBigNumber(this.value)) {
      this.throwIfFalsy(value.isEqualTo(this.value), value);
    } else {
      this.throwIfFalsy(this.value === value, value);
    }
  }

  public toMatchObject(arg: unknown): void | Promise<void> | AbstractExpect<any> | Promise<void | Promise<void> | AbstractExpect<any>> {
    this.throwIfFalsy(deepEqual(this.value, arg), arg);
  }

  public toBeFalsy() {
    this.throwIfFalsy(!this.value, true);
  }

  public toThrowError<T extends Error>(value?: new () => T) {
    // this.value = await Promise.resolve(this.value);
    if (value){
      this.throwIfFalsy(this.value instanceof value, undefined);
    } else {
      this.throwIfFalsy(this.value instanceof Error, undefined);
    }
  }

  public toThrow() {
    return this.toThrowError();
  }

  public get rejects() {
    const { ExpectValueAsync } = require("./ExpectValueAsync");
    if (typeof this.value === "function") {
      this.value = this.value().catch((err: unknown) => err);
      return new ExpectValueAsync(this.value);
    } else if (this.value instanceof Promise) {
      this.value = this.value.catch((err: unknown) => err);
      return new ExpectValueAsync(this.value);
    } else {
      throw new Error("not any value function");
    }
  }

  public get resolves() {
    const { ExpectValueAsync } = require("./ExpectValueAsync");
    if (typeof this.value === "function") {
      this.value = this.value().then((value: unknown) => value);
      return new ExpectValueAsync(this.value);
    } else if (this.value instanceof Promise) {
      this.value = this.value.then((value: unknown) => value);
      return new ExpectValueAsync(this.value);
    } else {
      throw new Error("not any value function");
    }
  }

  public toHaveEqualItems(expectItems: unknown[]) {
    const toBeItems = this.value as unknown[];
    const hasSameLength = expectItems?.length === toBeItems?.length;
    const hasSameItems = expectItems?.every((item, index) => {
      if (!toBeItems) {
        return false;
      }
      return item === toBeItems[index];
    });

    const pass = hasSameLength && hasSameItems;
    this.throwIfFalsy(pass, expectItems);
  }

  public throwIfFalsy(value: boolean, contextValue: unknown) {    
    if (value === this.isFalsy) {
      const hint = this.isFalsy ? `not` : ''
      // console.log(`Expected ${contextValue} ${hint} to be same as ${this.value}`);
      throw new FailedTestError();
    } else {
      // console.log(`${value} == ${this.value}`)
    }
  }
}
