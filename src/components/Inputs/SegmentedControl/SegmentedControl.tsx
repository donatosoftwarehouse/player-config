import { ReactElement } from 'react';
import type { SegmentedControlProps } from '@mantine/core';
import { SegmentedControl as MantineSegmentedControl } from '@mantine/core';

export const SegmentedControl = (
  props: SegmentedControlProps
): ReactElement => {
  return <MantineSegmentedControl {...props} />;
};
