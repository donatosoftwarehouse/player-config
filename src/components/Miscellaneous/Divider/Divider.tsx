import { ReactElement } from 'react';
import type { DividerProps } from '@mantine/core';
import { Divider as MantineDivider } from '@mantine/core';

export const Divider = (props: DividerProps): ReactElement => {
  return <MantineDivider {...props} />;
};
