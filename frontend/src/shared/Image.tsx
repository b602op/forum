import styled from "styled-components";

export const ImageStyled = styled.img<{
  $ownStyles?: string;
  $size?: 'small' | 'medium' | 'large';
}>`
  display: flex;
  ${({ $ownStyles }) => $ownStyles || ''}

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return `
          width: 50px;
          height: 50px;
        `;
      case "medium":
        return `
          width: 100px;
          height: 100px;
        `;
      case "large":
        return `
          width: 200px;
          height: 200px;
        `;
      default:
        return `
          width: 100px;
          height: 100px;
        `;
    }
  }}
`;

interface ImageProps {
  children?: React.ReactNode;
  ownStyles?: string;
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void
}

export const Image = ({
  children,
  ownStyles,
  src,
  alt,
  size,
  onClick,
}: ImageProps) => {
  return (
    <ImageStyled
      src={src}
      $ownStyles={ownStyles}
      alt={alt || "изображение"}
      $size={size}
      onClick={onClick}
    >
      {children}
    </ImageStyled>
  );
};
