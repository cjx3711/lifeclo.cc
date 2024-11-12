import styled from "@emotion/styled";
import { GOLD } from "../utils/colours";

export const Button = styled("button")`
  background-color: ${GOLD};
  color: white;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: filter 0.2s ease;
  &:hover {
    filter: brightness(1.1);
  }
`;
