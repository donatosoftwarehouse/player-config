import { ReactElement } from 'react';
import type { CenterProps } from '@mantine/core';
import { Center as MantineCenter } from '@mantine/core';

export const Center = ({ children, ...rest }: CenterProps): ReactElement => {
  return <MantineCenter {...rest}>{children}</MantineCenter>;
};
