import styled from "styled-components";

export const TextStyled = styled.p<{
  $ownStyles?: string;
}>`
  display: flex;
  ${({ $ownStyles }) => $ownStyles || ''}
`;

interface TextProps {
  children?: React.ReactNode;
  ownStyles?: string;
}

export const Text = ({
  children,
  ownStyles,
}: TextProps) => {
  return (
    <TextStyled $ownStyles={ownStyles}>
      {children}
    </TextStyled>
  );
};
