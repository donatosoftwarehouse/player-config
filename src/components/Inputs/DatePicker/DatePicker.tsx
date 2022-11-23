import { ReactElement } from 'react';
import type { DatePickerProps } from '@mantine/dates';
import { DatePicker as MantineDatePicker } from '@mantine/dates';

export const DatePicker = (props: DatePickerProps): ReactElement => {
  return <MantineDatePicker {...props} />;
};
