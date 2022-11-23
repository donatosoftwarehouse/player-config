import { ReactElement } from 'react';
import type { SelectProps } from '@mantine/core';
import { Select as MantineSelect } from '@mantine/core';

export const Select = (props: SelectProps): ReactElement => {
  return <MantineSelect {...props} />;
};
