import {
  Container,
  Title,
  TimerText,
  StartButton,
  RestartButton,
  ButtonContainer,
} from "./TimerBox.styles";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import PauseIcon from "@mui/icons-material/Pause";
import { useTimerContext } from "../../context/TimerContext";

const TimerBox = () => {
  const {
    minutes,
    seconds,
    startTimer,
    stopTimer,
    restartTimer,
    isTimerRunning,
    currentTimerLabel,
  } = useTimerContext();
  return (
    <Container>
      <Title>{currentTimerLabel}</Title>
      <TimerText>
        {minutes}:{String(seconds).padStart(2, "0")}
      </TimerText>
      <ButtonContainer>
        <StartButton
          onClick={isTimerRunning ? stopTimer : startTimer}
          $isActive={!isTimerRunning}
        >
          {isTimerRunning ? (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <PauseIcon />
              Pause
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <PlayArrowRoundedIcon />
              Start
            </div>
          )}
        </StartButton>
        <RestartButton onClick={restartTimer}>
          <ReplayRoundedIcon />
        </RestartButton>
      </ButtonContainer>
    </Container>
  );
};

export default TimerBox;
