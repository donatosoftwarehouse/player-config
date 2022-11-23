import { ReactElement } from 'react';
import type { GroupProps } from '@mantine/core';
import { Group as MantineGroup } from '@mantine/core';

export const Group = ({ children, ...rest }: GroupProps): ReactElement => {
  return <MantineGroup {...rest}>{children}</MantineGroup>;
};
