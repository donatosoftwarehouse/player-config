import { ReactElement } from 'react';
import { Container } from '../../components/Layout/Container/Container';
import { Title } from '../../components/Typography/Typography';
import { Center } from '../../components/Layout/Center/Center';
import { Header } from '../../modules/Header/Header';

export const ConfigurationsPage = (): ReactElement => {
  return (
    <Container fluid p={0}>
      <Header />
      <Container size="xl">
        <Center>
          <Title>Future: here be a list of custom player configurations</Title>
        </Center>
      </Container>
    </Container>
  );
};
