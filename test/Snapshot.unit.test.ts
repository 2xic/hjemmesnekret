import { Snapshot } from "../src/Snapshot";

function get_data(content: string): Record<string, string> {
    const data = Object.create(null);
    const populate = new Function('exports', content);
    populate(data);
    return data;
}

describe('snapshots', () => {
    it.skip('should run snapshot correctly', () => {
        console.log(new Snapshot().construct({
            a: 42,
            b: 300,
        }))
        console.log(`
        Object {
          "a": 42,
          "b": 300
        }
      `.trim())
        expect(new Snapshot().construct({
            a: 42,
            b: 300,
        }).trim()).toBe(`
          Object {
            "a": 42,
            "b": 300
          }
        `.trim());
    })

    it.skip('should correctly verify snapshot', () => {
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
});