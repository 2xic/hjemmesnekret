import { Snapshot } from "../src/utils/Snapshot";

describe("snapshots", () => {
  it("should run snapshot correctly", () => {
    expect(
      new Snapshot().construct({
        a: 42,
        b: 300,
      }).trim()
    ).toBe(
      `
          Object {
            "a": 42,
            "b": 300,
          }
        `.trim()
    );
  });

  it('should run nested snapshot correctly', () => {
    expect(new Snapshot().construct({
      x: {
        id: 42,
      },
    }).trim()).toBe(`
          Object {
            "x": Object {
              "id": 42,
            },
          }
        `.trim());
  })

  it("should correctly verify snapshot", () => {
    expect({
      a: 42,
      b: 300,
    }).toMatchInlineSnapshot(`
        Object {
          "a": 42,
          "b": 300,
        }
      `);
  });

  it("should correctly verify literal snapshot", () => {
    expect(4).toMatchInlineSnapshot(`4`);
  });
});
