import { ReactElement } from 'react';
import type { ContainerProps } from '@mantine/core';
import { Container as MantineContainer } from '@mantine/core';

export const Container = ({
  children,
  ...rest
}: ContainerProps): ReactElement => {
  return <MantineContainer {...rest}>{children}</MantineContainer>;
};
