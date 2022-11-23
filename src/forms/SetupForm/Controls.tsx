import { ReactElement } from 'react';
import { useFormContext } from './context';
import { Grid, Col } from '../../components/Layout/Grid/Grid';
import { Checkbox } from '../../components/Inputs/Checkbox/Checkbox';
import { TextInput } from '../../components/Inputs/TextInput/TextInput';
import { Select } from '../../components/Inputs/Select/Select';

export const Controls = (): ReactElement => {
  const form = useFormContext();

  const {
    values: {
      settings: { controls }
    }
  } = form;

  return (
    <Grid gutter="xl">
      <Col span={8}>
        <Select
          label="Show"
          value="auto"
          data={[
            { label: 'Auto', value: 'auto' },
            { label: 'Always', value: 'always' },
            { label: 'Never', value: 'never' }
          ]}
          {...form.getInputProps('settings.controls.show')}
        />
      </Col>
      <Col span={4}>
        <TextInput
          type="number"
          disabled={controls.show !== 'auto'}
          label="Hide after (s)"
          {...form.getInputProps('settings.controls.hide')}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Overlay"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.overlay', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Play"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.play', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Seek"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.seek', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Seeking"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.seeking', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Volume"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.volume', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Fullscreen"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.fullscreen', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Title"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.title', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={6}>
        <Checkbox
          label="Time"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.time', {
            type: 'checkbox'
          })}
        />
      </Col>
      <Col span={12}>
        <TextInput
          label="Loading text"
          disabled={controls.show === 'never'}
          {...form.getInputProps('settings.controls.loadingText')}
        />
      </Col>
    </Grid>
  );
};
