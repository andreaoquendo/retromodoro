import { useState } from "react";
import { Container } from "./SettingsButtons.styles";
import Settings from "../Settings/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import styled from "styled-components";
import { useTimerContext } from "../../context/TimerContext";

const CustomButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: transparent;
  &:hover {
    background-color: #b266ff;
  }
`;

const SettingsButtons = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [isVolumeUp, setIsVolumeUp] = useState(false);
  const { soundStatus } = useTimerContext();

  return (
    <Container>
      <CustomButton
        onClick={() => {
          setIsSettingsOpen((prev) => !prev);
        }}
        style={{ color: "#8cd9d9" }}
      >
        <SettingsOutlinedIcon />
        Settings
      </CustomButton>
      <CustomButton
        onClick={() => {
          setIsVolumeUp((prev) => !prev);
          soundStatus();
        }}
        style={{ color: "#ff9933" }}
      >
        {isVolumeUp ? <VolumeUpOutlinedIcon /> : <VolumeOffOutlinedIcon />}
        Sound
      </CustomButton>
      <Settings
        open={isSettingsOpen}
        onSubmit={() => {
          setIsSettingsOpen(false);
        }}
      />
    </Container>
  );
};

export default SettingsButtons;
