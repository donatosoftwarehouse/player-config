import { ReactElement } from 'react';
import type { AnchorProps } from '@mantine/core';
import { Anchor as MantineAnchor } from '@mantine/core';

export const Anchor = ({ children, ...rest }: AnchorProps): ReactElement => {
  return <MantineAnchor {...rest}>{children}</MantineAnchor>;
};
