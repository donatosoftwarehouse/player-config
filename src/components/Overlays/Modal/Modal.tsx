import { ReactElement } from 'react';
import type { ModalProps } from '@mantine/core';
import { Modal as MantineModal } from '@mantine/core';

export const Modal = ({ children, ...rest }: ModalProps): ReactElement => {
  return <MantineModal {...rest}>{children}</MantineModal>;
};
