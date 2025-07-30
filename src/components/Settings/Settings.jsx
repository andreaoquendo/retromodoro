import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styled from "styled-components";

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
  /* position: absolute; */
  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%) !important; */

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
        type={type}
        name={name}
        placeholder={placeholder}
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

const Settings = ({ open, onSubmit: onSubmitForm }) => {
  const [rangeSession, setRangeSession] = useState(0);

  console.log(open);
  const onSubmit = () => {
    localStorage.setItem("sessionRange", rangeSession * 60);
    onSubmitForm();
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
              <form onSubmit={onSubmit}>
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
                  />
                  <SettingsField
                    inputId="short-break"
                    name="short-break"
                    inputDescription="Short Break (in minutes)"
                    placeholder={5}
                  />
                  <SettingsField
                    inputId="long-break"
                    name="long-break"
                    inputDescription="Long Break (in minutes)"
                    placeholder={25}
                  />
                  <SettingsField
                    inputId="sessions-until-break"
                    name="sessions-until-break"
                    inputDescription="Sessions until break"
                    placeholder={4}
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
