/* eslint-disable react/destructuring-assignment */
import React from 'react';

import ButtonWrapper from './Button.styles';

declare interface IButtonProps {
  text: string;
  backgroundColor: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => (
  <ButtonWrapper data-testid="Button" backgroundColor={props?.backgroundColor} onClick={props?.onClick}>
    <span>{props?.text}</span>
  </ButtonWrapper>
);

export default Button;
