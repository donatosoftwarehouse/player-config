import { ReactElement } from 'react';
import type { SliderProps } from '@mantine/core';
import { Slider as MantineSlider } from '@mantine/core';

export const Slider = (props: SliderProps): ReactElement => {
  return <MantineSlider {...props} />;
};
