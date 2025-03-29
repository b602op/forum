
import styled from "styled-components";

export const ButtonStyled = styled.button<{
  $type: "primary" | "secondary" | "danger";
  $ownStyles?: string;
}>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border: none;
  color: white;

  ${({ $ownStyles }) => $ownStyles || ''}

  ${({ $type }) => {
    switch ($type) {
      case "secondary":
        return `
          background-color: #6b7280;
          &:hover {
            background-color: #4b5563;
          }
        `;
      case "danger":
        return `
          background-color: #dc2626;
          &:hover {
            background-color: #b91c1c;
          }
        `;
      default:
        return `
          background-color: #2563eb;
          &:hover {
            background-color: #1d4ed8;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;