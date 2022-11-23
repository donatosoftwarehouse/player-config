import { ReactElement } from 'react';
import { useFormContext } from './context';
import { Grid, Col } from '../../components/Layout/Grid/Grid';
import { TextInput } from '../../components/Inputs/TextInput/TextInput';
import { Select } from '../../components/Inputs/Select/Select';
import { Button } from '../../components/Buttons/Button/Button';
import { Divider } from '../../components/Miscellaneous/Divider/Divider';

export const Media = (): ReactElement => {
  const form = useFormContext();

  const {
    values: { media }
  } = form;

  const renderPlaylistItem = (item: any, index: number) => (
    <div key={index}>
      <Grid gutter="xs">
        <Col span={12}>
          <TextInput
            label="Source"
            {...form.getInputProps(`media.${index}.src`)}
          />
        </Col>
        <Col span={12}>
          <TextInput
            label="Poster"
            {...form.getInputProps(`media.${index}.poster`)}
          />
        </Col>
        <Col span={12}>
          <TextInput
            label="Title"
            {...form.getInputProps(`media.${index}.title`)}
          />
        </Col>
        <Col span={6}>
          <Select
            label="Engine"
            value="html5"
            data={[
              { label: 'HTML5', value: 'html5' },
              { label: 'Youtube', value: 'youtube' }
            ]}
            {...form.getInputProps(`media.${index}.engine`)}
          />
        </Col>
        <Col span={6}>
          <Button
            fullWidth
            color="red"
            mt="xl"
            onClick={() => form.removeListItem('media', index)}
          >
            Remove
          </Button>
        </Col>
        <Col span={12}>
          <Divider my="xs" />
        </Col>
      </Grid>
    </div>
  );

  const renderPlaylist = () => media.map(renderPlaylistItem);

  return (
    <>
      {renderPlaylist()}
      <Button
        mt="xs"
        onClick={() =>
          form.insertListItem('media', {
            src: '',
            poster: '',
            title: '',
            engine: 'html5'
          })
        }
      >
        Add new media
      </Button>
    </>
  );
};
