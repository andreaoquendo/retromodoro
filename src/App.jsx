import "./App.css";
import { TimerProvider } from "./context/TimerProvider";
import PomodoroPage from "./pages/PomodoroPage";

const STARTER_TIME = 60 * 25;

function App() {
  return (
    <TimerProvider>
      <PomodoroPage />;
    </TimerProvider>
  );
}

export default App;
