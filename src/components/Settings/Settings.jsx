import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";
import { DEFAULT_VALUES, STORAGE_KEYS } from "../../constants/storageKeys";
import { storage } from "../../lib/storage";
import { useTimerContext } from "../../context/TimerContext";

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled(motion.div)`
  font-family: "Orbitron", monospace;
  background-color: #04071a;
  padding: 24px;
  border: 1px solid #ff4dd24d;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  opacity: 1;
`;

const CustomInput = styled.input`
  border: 0;
  outline: 0;
  box-sizing: border-box;
  &:hover,
  &:focus {
    border: 0;
    outline: 0;
  }
`;

const SettingsField = ({
  inputId,
  type = "number",
  name,
  inputDescription,
  placeholder = 25,
  defaultValue,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      <label htmlFor={inputId} style={{ color: "#ccffff", fontSize: "14px" }}>
        {inputDescription}
      </label>
      <CustomInput
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={{
          marginTop: "8px",
          width: "100%",
          backgroundColor: "#1b1d32",
          color: "#ccffff",
          border: "1px solid #4c2673",
          borderRadius: "0.5rem",
          padding: "8px 12px",
        }}
      />
    </div>
  );
};

const Settings = ({ open, onSubmit: onSubmitForm = null }) => {
  const formRef = useRef(null);
  const { restartTimer } = useTimerContext();

  const getStoredValue = (key, defaultVal = 0) => {
    const val = storage.get(key);
    return val ? Number(val) / 60 : defaultVal; // convertendo de segundos para minutos
  };

  const getStoredValueWithoutMinutes = (key, defaultVal = 0) => {
    const val = storage.get(key);
    return val ? Number(val) : defaultVal; // convertendo de segundos para minutos
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);

    const sessionRange = data.get("work-session");
    const shortBreak = data.get("short-break");
    const longBreak = data.get("long-break");
    const sessionsUntilBreak = data.get("sessions-until-break");

    storage.set(STORAGE_KEYS.SESSION_RANGE, Number(sessionRange) * 60);
    storage.set(STORAGE_KEYS.SHORT_BREAK, Number(shortBreak) * 60);
    storage.set(STORAGE_KEYS.LONG_BREAK, Number(longBreak) * 60);
    storage.set(STORAGE_KEYS.SESSIONS_UNTIL_BREAK, Number(sessionsUntilBreak));

    restartTimer();
    onSubmitForm?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <Background
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence propagate>
            <Container
              style={{ width: "100%", maxWidth: "32rem" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <form ref={formRef} onSubmit={handleSubmit}>
                <h2
                  style={{
                    textTransform: "uppercase",
                    color: "#00ffff",
                    fontSize: "18px",
                    marginBottom: "18px",
                  }}
                >
                  Timer Settings
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  <SettingsField
                    inputId="work-session"
                    name="work-session"
                    inputDescription="Work Session (in minutes)"
                    placeholder={25}
                    defaultValue={getStoredValue(
                      STORAGE_KEYS.SESSION_RANGE,
                      DEFAULT_VALUES.SESSION_RANGE
                    )}
                  />
                  <SettingsField
                    inputId="short-break"
                    name="short-break"
                    inputDescription="Short Break (in minutes)"
                    placeholder={5}
                    defaultValue={getStoredValue(
                      STORAGE_KEYS.SHORT_BREAK,
                      DEFAULT_VALUES.SHORT_BREAK
                    )}
                  />
                  <SettingsField
                    inputId="long-break"
                    name="long-break"
                    inputDescription="Long Break (in minutes)"
                    placeholder={15}
                    defaultValue={getStoredValue(
                      STORAGE_KEYS.LONG_BREAK,
                      DEFAULT_VALUES.LONG_BREAK
                    )}
                  />
                  <SettingsField
                    inputId="sessions-until-break"
                    name="sessions-until-break"
                    inputDescription="Sessions until long break"
                    placeholder={4}
                    defaultValue={getStoredValueWithoutMinutes(
                      STORAGE_KEYS.SESSIONS_UNTIL_BREAK,
                      DEFAULT_VALUES.SESSIONS_UNTIL_BREAK
                    )}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    marginTop: "24px",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(#18e9fe, #8f85ff)",
                      width: "100%",
                      borderRadius: "0.5rem",
                      color: "#04071a",
                      padding: "8px 16px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={onSubmitForm}
                    style={{
                      width: "100%",
                      borderRadius: "0.5rem",
                      borderColor: "#1b1d32",
                      color: "#ccffff",
                      padding: "8px 16px",
                      backgroundColor: "#04071a",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Container>
          </AnimatePresence>
        </Background>
      )}
    </AnimatePresence>
  );
};

export default Settings;
