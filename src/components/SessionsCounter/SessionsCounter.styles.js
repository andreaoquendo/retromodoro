import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

export const Session = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #8cd9d9;
  line-height: 1;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  font-weight: 500;

  span {
    font-family: "JetBrains Mono", monospace;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const Cycles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #ff4cd2;
  line-height: 1;
  letter-spacing: 0.05rem;
  text-transform: uppercase;

  span {
    font-family: "JetBrains Mono", monospace;
    font-size: 24px;
    font-weight: 700;
  }
`;
