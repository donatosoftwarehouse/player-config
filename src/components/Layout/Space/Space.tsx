import { ReactElement } from 'react';
import type { SpaceProps } from '@mantine/core';
import { Space as MantineSpace } from '@mantine/core';

export const Space = (props: SpaceProps): ReactElement => {
  return <MantineSpace {...props} />;
};
