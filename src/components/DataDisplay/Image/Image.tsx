import { ReactElement } from 'react';
import type { ImageProps } from '@mantine/core';
import { Image as MantineImage } from '@mantine/core';

export const Image = (props: ImageProps): ReactElement => {
  return <MantineImage {...props} />;
};
