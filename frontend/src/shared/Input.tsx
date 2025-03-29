import React from "react";
import { Container } from "./Container";
import styled from "styled-components";

interface InputProps {
  type?: "text" | "email" | "password" | "tel" | "number" | "date" | "file";
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  ownStyles?: string;
  multiple?: boolean;
}

export const InputStyled = styled.input<{
  $ownStyles?: string;
}>`
  display: flex;
  ${({ $ownStyles }) => $ownStyles || ''}
`;

export const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  label,
  ownStyles,
  multiple = false,
}) => {
  if (type === "file") {
    return (
      <Container ownStyles="display: flex; margin: 10px;">
        <InputStyled
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          $ownStyles={`display:none; border: none; ${ownStyles}`}
          multiple={multiple}
          accept="image/*"
          id="fileInput"
        />
        <label htmlFor="fileInput">Выберите файл</label>
      </Container>
    )
  }

  return (
    <Container ownStyles={ownStyles}>
      {label && <label>{label}</label>}
      <InputStyled
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Container>
  );
};
