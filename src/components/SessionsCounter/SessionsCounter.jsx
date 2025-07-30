import { Container, Cycles, Session } from "./SessionsCounter.styles";

const SessionsCounter = () => {
  return (
    <Container>
      <Session>
        <span>1</span>
        Sessions
      </Session>
      <Cycles>
        <span>0</span>
        Cycles
      </Cycles>
    </Container>
  );
};

export default SessionsCounter;
