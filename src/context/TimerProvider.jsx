import { useTimer } from "../hooks/useTimer";
import { TimerContext } from "./TimerContext";

export const TimerProvider = ({ children }) => {
  const timer = useTimer();
  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};
