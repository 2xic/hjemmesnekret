import dayjs from "dayjs";
import { useFakeTimers, useRealTime } from "../src/utils/useMockTime";

describe("Timer", () => {
  it("should mock date time", () => {
    useFakeTimers().setSystemTime(new Date("2022-02-01 00:00:00"));

    expect(dayjs().format("YYYY-MM-DD")).toBe("2022-02-01");

    useRealTime();

    expect(dayjs().format("YYYY-MM-DD")).not.toBe("2022-02-01");
  });

  it('should not mess up time calculation when using fake timer', () => {
    useFakeTimers().setSystemTime(new Date('2022-02-01'))
    useRealTime();
  })

  it('should be possible to use jest keyword for mocking', () => {
    jest.useFakeTimers().setSystemTime(new Date("2022-02-01 00:00:00"))
    expect(dayjs().format("YYYY-MM-DD")).toBe("2022-02-01");
    jest.useRealTimers();

    expect(dayjs().format("YYYY-MM-DD")).not.toBe("2022-02-01");
  })
});
