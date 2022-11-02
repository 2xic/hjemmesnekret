import FakeTimers from "@sinonjs/fake-timers";

function useMockTime(now: Date | number) {
  if (global.clock) {
    useRealTime();
  }

  global.clock = FakeTimers.install({
    now,
  });
}

export function useRealTime() {
  if (global.clock) {
    global.clock.uninstall();
    global.clock = undefined;
  }
}

export function useFakeTimers() {
  return {
    setSystemTime: (time: Date) => useMockTime(time),
  };
}
