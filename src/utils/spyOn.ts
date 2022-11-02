class SpyConstruction {
  private value: unknown;

  constructor(private object: Object, private field: string, private original: unknown) {}

  public mockReturnValue(value: unknown) {
    this.value = value;
    this.object[this.field as keyof Object] = this.get.bind(this) as any;
  }

  public mockRestore() {
    this.object[this.field as keyof Object] = this.original as any;
  }

  public get() {
    return this.value;
  }
}

export function spyOn(object: Object, field: string) {
  return new SpyConstruction(object, field, object[field as keyof Object]);
}
