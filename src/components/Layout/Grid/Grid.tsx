import { ReactElement } from 'react';
import type { GridProps } from '@mantine/core';
import type { ColProps } from '@mantine/core';
import { Grid as MantineGrid } from '@mantine/core';
import { Col as MantineCol } from '@mantine/core';

export const Grid = ({ children, ...rest }: GridProps): ReactElement => {
  return <MantineGrid {...rest}>{children}</MantineGrid>;
};

export const Col = ({ children, ...rest }: ColProps): ReactElement => {
  return <MantineCol {...rest}>{children}</MantineCol>;
};
