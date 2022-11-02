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

describe("Test", () => {
  [1, 2].map((item) => {
    it.skip("should correctly have test inside map", async () => {
      expect(item).not.toBe(4);
    });

    let i = 0

    beforeEach(() => {
      i = item;
    });

    it('should have normal map inside map', () => {
      expect(typeof i).toBe('number')
    })
  });
});

describe('test', () => {
  let executed = 0;
  describe('single test', () => {
    it('should run this once', () => {
      expect(++executed).toBe(1);
    })
  });

  describe('test two', () => {
    it('should run this once', () => {
      expect(++executed).toBe(2);
    })
  })
});


describe.skip('should skip correctly', () => {
  beforeEach(() => {
    throw new Error('this should not be executed')
  })

  beforeAll(() => {
    throw new Error('this should not be executed')
  })

  afterAll(() => {
    throw new Error('this should not be executed')
  })
})