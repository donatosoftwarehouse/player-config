import { ReactElement } from 'react';
import type { TitleProps, TextProps } from '@mantine/core';
import { Title as MantineTitle, Text as MantineText } from '@mantine/core';

export const Title = ({ children, ...rest }: TitleProps): ReactElement => {
  return <MantineTitle {...rest}>{children}</MantineTitle>;
};

export const Text = ({ children, ...rest }: TextProps): ReactElement => {
  return <MantineText {...rest}>{children}</MantineText>;
};
