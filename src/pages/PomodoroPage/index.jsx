import { Container, Header } from "./styles";
import TimerBox from "../../components/TimerBox/TimerBox";
import SessionsCounter from "../../components/SessionsCounter/SessionsCounter";
import SettingsButtons from "../../components/SettingsButtons/SettingsButtons";
const STARTER_TIME = 60 * 25;

const PomodoroPage = () => {
  return (
    <>
      <Container>
        <Header>
          <h1>Retromoro</h1>
          <span>Synthwave Productivity Timer</span>
        </Header>
        <TimerBox />
        <SessionsCounter />
        <SettingsButtons />
      </Container>
    </>
  );
};

export default PomodoroPage;
