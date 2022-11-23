import { createFormContext } from '@mantine/form';
import { SetupFormProps } from './types';

// You can give context variables any name
export const [FormProvider, useFormContext, useForm] =
  createFormContext<SetupFormProps>();
