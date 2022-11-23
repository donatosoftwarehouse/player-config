import { ReactElement } from 'react';
import { useFormContext } from './context';
import { Grid, Col } from '../../components/Layout/Grid/Grid';
import { Checkbox } from '../../components/Inputs/Checkbox/Checkbox';
import { TextInput } from '../../components/Inputs/TextInput/TextInput';

export const Settings = (): ReactElement => {
  const form = useFormContext();

  const {
    values: {
      settings: { responsive }
    }
  } = form;

  return (
    <Grid gutter="xl">
      <Col span={12}>
        <Checkbox
          label="Responsive"
          {...form.getInputProps('settings.responsive', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={4}>
        <TextInput
          type="number"
          label="Width"
          disabled={responsive}
          {...form.getInputProps('settings.width')}
        />
      </Col>
      <Col span={4}>
        <TextInput
          type="number"
          label="Height"
          disabled={responsive}
          {...form.getInputProps('settings.height')}
        />
      </Col>
      <Col span={4}>
        <TextInput
          type="number"
          label="Volume"
          {...form.getInputProps('settings.volume')}
        />
      </Col>
      <Col span={4}>
        <Checkbox
          label="Preload"
          {...form.getInputProps('settings.preload', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={4}>
        <Checkbox
          label="Autoplay"
          {...form.getInputProps('settings.autoplay', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={4}>
        <Checkbox
          label="Loop"
          {...form.getInputProps('settings.loop', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={12}>
        <Checkbox
          label="Playlist"
          {...form.getInputProps('settings.playlist', {
            type: 'checkbox'
          })}
        />
      </Col>
    </Grid>
  );
};
