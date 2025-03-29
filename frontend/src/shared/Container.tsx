import styled from "styled-components";

export const ContainerStyled = styled.div<{
  $ownStyles?: string;
}>`
  display: flex;
  ${({ $ownStyles }) => $ownStyles || ''}
`;

type ContainerProps = {
  ownStyles?: string;
  children: React.ReactNode
}

export const Container = ({ ownStyles, children }: ContainerProps) => {
  return (
    <ContainerStyled
      $ownStyles={ownStyles}
    >
      {children}
    </ContainerStyled>
  )
}