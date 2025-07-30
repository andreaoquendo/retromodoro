import { useState } from "react";
import { Container, Header } from "./styles";
import TimerBox from "../../components/TimerBox/TimerBox";
import Settings from "../../components/Settings/Settings";
import SessionsCounter from "../../components/SessionsCounter/SessionsCounter";
import SettingsButtons from "../../components/SettingsButtons/SettingsButtons";
const STARTER_TIME = 60 * 25;

const PomodoroPage = () => {
  const sessionRange = localStorage.getItem("sessionRange") || STARTER_TIME;
  const [timer, setTimer] = useState(sessionRange);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const startTimer = () => {
    if (intervalId) return;

    const id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setIsTimerRunning(true);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId); // stop it
    setIsTimerRunning(false);
    setIntervalId(null); // reset the ID
  };

  const restartTimer = () => {
    setTimer(sessionRange);
    stopTimer();
  };

  return (
    <>
      <Container>
        <Header>
          <h1>Retromoro</h1>
          <span>Synthwave Productivity Timer</span>
        </Header>
        <TimerBox
          minutes={minutes}
          startTimer={startTimer}
          stopTimer={stopTimer}
          restartTimer={restartTimer}
          seconds={seconds}
          isTimerRunning={isTimerRunning}
        />
        <SessionsCounter />
        <SettingsButtons />
      </Container>
    </>
  );
};

export default PomodoroPage;
