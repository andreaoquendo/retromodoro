import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid #542158;
  background-color: #0c0e22;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h2`
  text-transform: uppercase;
  color: #ff4dd2;
  margin: 0;
`;

export const TimerText = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-weight: bold;
  font-size: 5rem;
  line-height: 1;

  background: linear-gradient(#18e9fe, #8f85ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StartButton = styled.button<{ $isActive }>`
  padding: 8px 24px;
  font-size: ${(props) => (props.$isActive ? "1rem" : "0.875rem")};
  text-transform: uppercase;
  line-height: 1;
  color: ${(props) => (props.$isActive ? "inherit" : "#03FFFF")};
  background: ${(props) =>
    props.$isActive ? "linear-gradient(#18e9fe, #8f85ff)" : "transparent"};
  border: ${(props) => (props.$isActive ? "0" : "2px solid #03FFFF")};

  transition: background-color 0.5s ease-in-out;
  transition: font-size 0.5s ease-in-out;

  &:hover {
    background-color: #03ffff;
    color: ${(props) => (props.$isActive ? "inherit" : "black")};
    border: ${(props) => (props.$isActive ? "0" : "2px solid #03FFFF")};

    box-shadow: ${(props) =>
      props.$isActive ? "0" : "0 0px 24px rgba(3, 255, 255, 0.54)"};
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

export const RestartButton = styled.button`
  padding: 8px 24px;
  font-size: 1em;
  text-transform: uppercase;
  background: linear-gradient(to right, #f350d9, #be62f8);
  border: 0;
  transition: box-shadow 0.3s ease-in-out;
  color: white;

  &:hover {
    box-shadow: 0 0px 24px rgba(243, 80, 217, 0.54);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
