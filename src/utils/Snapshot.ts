/* eslint-disable @typescript-eslint/ban-types */

export class Snapshot {
  constructor(private baseLevel: number = 5) {}

  public construct(value: unknown ) {
    if (typeof value === 'string' || typeof value === 'number') {
      return value.toString();
    } else if (value instanceof Object) {
      const results = this.recursive_construct({
        value,
        level: this.baseLevel,
      });

      return `\n${results}\n`;
    } else {
      throw new Error('Unknown type')
    }
  }

  private recursive_construct({
    value,
    level,
  }: {
    value: Object | (new () => unknown);
    level: number;
  }): string {
    const spaceChar = "  ";
    const objectEntries = Object.entries(value);
    const constructor = value.constructor.name;
    const rootPadding = spaceChar.repeat(level);
    const levelPadding = spaceChar.repeat(level + 1);
    const objectKeyValue =
      objectEntries
        .map(([key, rawValue]) => {
          let value = "";

          if (typeof rawValue == "object") {
            value = this.recursive_construct({
              value: rawValue,
              level: level + 1,
            });
          } else {
            value = rawValue.toString();
          }

          return `\n${levelPadding}"${key}": ${value}`;
        })
        .join(",") + `,\n${rootPadding}`;

    const rootLevelPadding = level > this.baseLevel ? "" : rootPadding;
    return `${rootLevelPadding}${constructor} {${objectKeyValue}}`;
  }
}
