import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  color: #8bd9d9;
  h1 {
    font-size: 3.5rem;
    line-height: 1;
    font-weight: 900;

    margin: 0;

    background: linear-gradient(to right, #f94fd5, #b964fb);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span {
    font-family: "JetBrains Mono", monospace;
  }
`;
