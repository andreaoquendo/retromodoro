import { useTimerContext } from "../../context/TimerContext";
import { Container, Cycles, Session } from "./SessionsCounter.styles";

const SessionsCounter = () => {
  const { totalSessionsCount, cyclesCount } = useTimerContext();
  return (
    <Container>
      <Session>
        <span>{totalSessionsCount || "0"}</span>
        Sessions
      </Session>
      <Cycles>
        <span>{cyclesCount | "0"}</span>
        Cycles
      </Cycles>
    </Container>
  );
};

export default SessionsCounter;
