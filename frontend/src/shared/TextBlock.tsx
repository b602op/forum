import React from "react";

import styled from "styled-components";

export const TextBlockStyled = styled.textarea<{
  $ownStyles?: string;
}>`
  display: flex;
  ${({ $ownStyles }) => $ownStyles || ''}
`;

interface TextBlockProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  ownStyles?: string;
}

export const TextBlock = ({
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  disabled = false,
}: TextBlockProps) => {
  return (
    <TextBlockStyled
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
};
