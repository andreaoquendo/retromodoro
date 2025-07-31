import { useState, useEffect, useRef, useCallback } from "react";
import { storage } from "../lib/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

const sessionRange = storage.get(STORAGE_KEYS.SESSION_RANGE);
const totalSessionsInitial = storage.get(STORAGE_KEYS.SESSIONS_TODAY);
const numberSessionPerCycleInitial = storage.get(
  STORAGE_KEYS.SESSIONS_UNTIL_BREAK
);

export const useTimer = () => {
  const [timer, setTimer] = useState(sessionRange);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimerLabel, setCurrentTimerLabel] = useState("work");
  const sessionsCount = useRef(0);
  const intervalRef = useRef(null);

  const sound = new Audio("./end-session-sound.wav");

  const [totalSessionsCount, setTotalSessionsCount] = useState(
    totalSessionsInitial || 0
  );
  const cyclesCount = Math.floor(
    totalSessionsCount / numberSessionPerCycleInitial
  );

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  function soundStatus() {
    sound.muted = !sound.muted;
  }

  const restartTimer = useCallback(() => {
    setTimer(storage.get(STORAGE_KEYS.SESSION_RANGE));
    stopTimer();
  }, []);

  useEffect(() => {
    const now = new Date();
    const savedDate = storage.get(STORAGE_KEYS.LAST_DATE_UPDATE);
    if (now.toString() === savedDate) {
      storage.clearApp();
      restartTimer();
      setTotalSessionsCount(0);
    }
    sessionsCount.current = totalSessionsCount % numberSessionPerCycleInitial;
  }, [restartTimer, totalSessionsCount]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.SESSIONS_TODAY, totalSessionsCount);
    const now = new Date();
    storage.set(STORAGE_KEYS.LAST_DATE_UPDATE, now.toDateString());
  }, [totalSessionsCount]);

  const changeTimer = useCallback(
    (count) => {
      const configTimer = (label, storageKey) => {
        setTimer(storage.get(storageKey));
        setCurrentTimerLabel(label);
      };

      sound.play();

      if (currentTimerLabel == "work") {
        const sessores = storage.get(STORAGE_KEYS.SESSIONS_UNTIL_BREAK);

        if (count >= sessores) {
          configTimer("long break", STORAGE_KEYS.LONG_BREAK);
        } else {
          configTimer("short break", STORAGE_KEYS.SHORT_BREAK);
        }
      } else if (
        currentTimerLabel == "short break" ||
        currentTimerLabel == "long break"
      ) {
        configTimer("work", STORAGE_KEYS.SESSION_RANGE);
      }
    },
    [currentTimerLabel]
  );

  useEffect(() => {
    if (timer <= 0 && isTimerRunning) {
      stopTimer();

      if (currentTimerLabel == "work") {
        sessionsCount.current += 1;
        setTotalSessionsCount((prev) => prev + 1);
        console.log("AAAAA");
      }

      changeTimer(sessionsCount.current);
      startTimer();
    }
  }, [timer, isTimerRunning, changeTimer, currentTimerLabel, sessionsCount]);

  const startTimer = () => {
    if (intervalRef.current) return;

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 60;
        setIsTimerRunning(false);
        return 0;
      });
    }, 1000);
    intervalRef.current = id;
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    minutes,
    seconds,
    isTimerRunning,
    startTimer,
    stopTimer,
    restartTimer,
    currentTimerLabel,
    totalSessionsCount,
    cyclesCount,
    soundStatus,
  };
};
