import { ReactElement } from 'react';
import { Grid, Col } from '../../components/Layout/Grid/Grid';
import { Accordion } from '@mantine/core';
import { Title } from '../../components/Typography/Typography';
import { Button } from '../../components/Buttons/Button/Button';
import { Settings } from './Settings';
import { Controls } from './Controls';
import { Media } from './Media';
import { FormProvider, useForm } from './context';
import { SetupFormProps } from './types';

interface Props {
  onSubmit: (values: SetupFormProps) => void;
}

export const initialValues: SetupFormProps = {
  settings: {
    responsive: true,
    width: 600,
    height: 338,
    volume: 80,
    preload: true,
    autoplay: false,
    loop: false,
    playlist: false,
    controls: {
      show: 'auto',
      hide: 5,
      overlay: true,
      play: true,
      seek: true,
      seeking: true,
      volume: true,
      fullscreen: true,
      title: true,
      time: true,
      loadingText: 'Loading...'
    }
  },
  media: [
    {
      src: '',
      poster: '',
      title: '',
      engine: 'html5'
    }
  ]
};

export const SetupForm = ({ onSubmit }: Props): ReactElement => {
  const form = useForm({
    initialValues
  });

  const handleSubmit = (values: SetupFormProps) => {
    onSubmit(values);
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title order={4}>Configuration</Title>

        <Accordion defaultValue="settings" chevronPosition="left">
          <Accordion.Item value="settings">
            <Accordion.Control>Settings</Accordion.Control>
            <Accordion.Panel>
              <Settings />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="controls">
            <Accordion.Control>Controls</Accordion.Control>
            <Accordion.Panel>
              <Controls />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="media">
            <Accordion.Control>Media</Accordion.Control>
            <Accordion.Panel>
              <Media />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Grid mt="xl">
          <Col span={8}>
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Col>
          <Col span={4}>
            <Button variant="default" fullWidth onClick={form.reset}>
              Reset
            </Button>
          </Col>
        </Grid>
      </form>
    </FormProvider>
  );
};
