import { ReactElement } from 'react';
import type { FlexProps } from '@mantine/core';
import { Flex as MantineFlex } from '@mantine/core';

export const Flex = ({ children, ...rest }: FlexProps): ReactElement => {
  return <MantineFlex {...rest}>{children}</MantineFlex>;
};
