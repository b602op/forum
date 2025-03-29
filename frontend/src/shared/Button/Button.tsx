import React from "react";
import { ButtonStyled } from "./styles";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
  ownStyles?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "primary",
  disabled = false,
  ownStyles = "",
}) => (
  <ButtonStyled
    onClick={onClick}
    disabled={disabled}
    $type={type}
    $ownStyles={ownStyles}
  >
    {children}
  </ButtonStyled>
);