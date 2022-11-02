export abstract class AbstractExpect<T> {
  protected isFalsy = false;

  constructor(protected value: unknown) {}

  public abstract toMatchObject(arg: T): T | Promise<T>;
  public abstract toBeTruthy(): T | Promise<T>;
  public abstract toHaveLength(length: number): T | Promise<T>;
  public abstract toBeInstanceOf(truth: new () => unknown): T | Promise<T>;
  public abstract toBe(value: unknown): T | Promise<T>;
  public abstract toStrictEqual(value: unknown): T | Promise<T>;
  public abstract toMatchInlineSnapshot(value: unknown): T | Promise<T>;
  public abstract toBeDefined(): T | Promise<T>;
  public abstract toBeUndefined(): T | Promise<T>;
  public abstract toBeLessThan(value: number): T | Promise<T>;
  public abstract toBeLessThanOrEqual(value: number): T | Promise<T>;
  public abstract toBeGreaterThanOrEqual(value: number): T | Promise<T>;
  public abstract toBeGreaterThan(value: number): T | Promise<T>;
  public abstract toContain(value: string): T | Promise<T>;
  public abstract toContainEqual(value: Record<string, unknown>): T | Promise<T>;
  public abstract toEqual(value: unknown): T | Promise<T>;
  public abstract toBeFalsy(): T | Promise<T>;
  public abstract toThrowError(): T | Promise<T>;
  public abstract toThrow(): T | Promise<T>;

  public get not() {
    this.isFalsy = !this.isFalsy;
    return this;
  }
}
