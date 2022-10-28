describe("Test", () => {
  it.each([[1], [2]])("should each twice with %i", (i: number) => {
    expect(i).toBe(i);
  });

  it.skip("should correctly skip", async () => {
    expect(2).toBe(4);
  });

  it.skip("test should run", () => {
    console.log(":)");
  });
});
