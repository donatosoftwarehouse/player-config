import { ReactElement } from 'react';
import type { ButtonProps } from '@mantine/core';
import { Button as MantineButton } from '@mantine/core';

interface Props extends ButtonProps {
  onClick?: () => void;
}

export const Button = ({ children, ...rest }: Props): ReactElement => {
  return <MantineButton {...rest}>{children}</MantineButton>;
};
