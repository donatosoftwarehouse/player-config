import { ReactElement } from 'react';
import type { TextInputProps } from '@mantine/core';
import { TextInput as MantineTextInput } from '@mantine/core';

export const TextInput = (props: TextInputProps): ReactElement => {
  return <MantineTextInput {...props} />;
};
