import { ReactElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/Layout/Container/Container';
import { Header } from '../../modules/Header/Header';
import { Title } from '../../components/Typography/Typography';
import { Center } from '../../components/Layout/Center/Center';
import { Button } from '../../components/Buttons/Button/Button';

export const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  const navigateToSetupPage = useCallback(
    () => navigate('/setup', { replace: true }),
    [navigate]
  );

  return (
    <Container fluid>
      <Header />
      <Container size="xl">
        <Center>
          <Title order={1} my={50}>
            A simple demo app that stores video player in different
            configurations
          </Title>
          <Button onClick={navigateToSetupPage}>Configure a new video</Button>
        </Center>
      </Container>
    </Container>
  );
};
