import BigNumber from 'bignumber.js';

export class Expect {
  private isFalsy = false;

  constructor(private value: unknown) {}

  public toBeTruthy() {
    this.throwIfFalsy(!!this.value);
  }

  public toHaveLength(length: number) {
    if (Array.isArray(this.value)) {
      this.throwIfFalsy(this.value.length === length)
    } else {
      this.throwIfFalsy(false);
    }
  }

  public async toMatchObject(value: unknown) {
    return this;
  }

  public async toBeInstanceOf(truth: new () => unknown) {
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value instanceof truth)
  }

  public async toBe(value: unknown){
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value === value);
  }

  public async toStrictEqual(value: unknown) {
    this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tostrictequalvalue
    // TODO
    return this;
  }

  public async toMatchInlineSnapshot(value: unknown){
    this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tomatchinlinesnapshotpropertymatchers-inlinesnapshot
    // TODO
    return this;
  }

  public async toBeDefined() {
    this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tobedefined
    this.throwIfFalsy(this.value !== undefined);
  }

  public async toBeUndefined() {
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value === undefined);
  }

  public async toBeLessThan(value: number) {
    this.value = await Promise.resolve(this.value);
    // https://jestjs.io/docs/expect#tobedefined
    this.throwIfFalsy((this.value as number) < value);
  }

  public async toBeLessThanOrEqual(value: number) {
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy((this.value as number) <= value);
  }

  public async toBeGreaterThanOrEqual(value: number) {
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy((this.value as number) >= value);
  }

  public async toBeGreaterThan(value: number) {
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy((this.value as number) > value);
  }

  public async toContain(value: string) {
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(typeof this.value === 'string' && this.value.includes(value))
  }

  public toContainEqual(value: Record<string, unknown>) {
    const listValue = Array.isArray(this.value) ? this.value : [this.value];
    if (typeof listValue[0] === 'object') {
      const results: boolean[] = [];
      for (const listItem of listValue) {
        Object.entries(value).forEach(([key, value] : [string, unknown]) => {
          results.push(typeof listItem === 'object' && value === (listItem as Record<string, unknown>)[key])
        })
      }
      this.throwIfFalsy(results.includes(true))
    } else {
      this.throwIfFalsy(this.isFalsy)
    }
  }

  static objectContaining(value: unknown){
    return value;
  }

  public toEqual(value: unknown){
    if (BigNumber.isBigNumber(value) && BigNumber.isBigNumber(this.value)){
      this.throwIfFalsy(value.isEqualTo(this.value))
    } else {
      this.throwIfFalsy(this.value === value);
    }
  }

  public toBeFalsy() {
    this.throwIfFalsy(!this.value);
  }

  public get not() {
    this.isFalsy = !this.isFalsy;
    return this;
  }

  public async toThrowError(){
    this.value = await Promise.resolve(this.value);
    this.throwIfFalsy(this.value instanceof Error);
  }

  public async toThrow(){
    return this.toThrowError();
  }

  public get rejects() {
    if (typeof this.value === 'function') {
      this.value = this.value().catch((err: unknown) => err);
      return this;
    } else if (this.value instanceof Promise){
      this.value = this.value.catch((err: unknown) => err);
      return this;
    } else {
      throw new Error('not any vlaue function')
    }
  }

  public toHaveEqualItems(expectItems: unknown[]){
    const toBeItems = this.value as unknown[];
    const hasSameLength = expectItems?.length === toBeItems?.length;
    const hasSameItems = expectItems?.every((item, index ) => {
      if (!toBeItems){
        return false;
      }
      return item === toBeItems[index];
    })

    const pass = hasSameLength && hasSameItems;
    this.throwIfFalsy(pass);
  }

  public throwIfFalsy(value: boolean){
    if (value === this.isFalsy){
      console.log(`${value} is not same as ${this.value}`)
      throw new Error('bad test')
    } else {
    //  console.log(`${value} == ${this.value}`)
    }
  }
}
