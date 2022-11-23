import { ReactElement } from 'react';
import type { CardProps } from '@mantine/core';
import { Card as MantineCard } from '@mantine/core';

export const Card = (props: CardProps): ReactElement => {
  return <MantineCard {...props} />;
};
