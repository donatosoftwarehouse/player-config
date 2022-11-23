import { ReactElement } from 'react';
import type { CheckboxProps } from '@mantine/core';
import type { GroupProps } from '@mantine/core/';
import { Checkbox as MantineCheckbox } from '@mantine/core';
import { Group as MantineCheckboxGroup } from '@mantine/core';

export const Checkbox = (props: CheckboxProps): ReactElement => {
  return <MantineCheckbox {...props} />;
};

export const Group = ({ children, ...rest }: GroupProps): ReactElement => {
  return <MantineCheckboxGroup {...rest}>{children}</MantineCheckboxGroup>;
};
