import { ReactElement, useState } from 'react';
import { Container } from '../../components/Layout/Container/Container';
import { Grid, Col } from '../../components/Layout/Grid/Grid';
import { Header } from '../../modules/Header/Header';
import { Player } from '../../modules/Player/Player';
import { SetupForm, initialValues } from '../../forms/SetupForm/SetupForm';
import { SetupFormProps } from '../../forms/SetupForm/types';

export const SetupPage = (): ReactElement => {
  const [configuration, setConfiguration] =
    useState<SetupFormProps>(initialValues);

  return (
    <Container fluid>
      <Header />
      <Container size="xl">
        <Grid gutter="xl">
          <Col xs={12} lg={8}>
            <Player configuration={configuration} />
          </Col>
          <Col xs={12} lg={4}>
            <SetupForm onSubmit={setConfiguration} />
          </Col>
        </Grid>
      </Container>
    </Container>
  );
};
