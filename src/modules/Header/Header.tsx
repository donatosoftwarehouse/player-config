import { ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Tabs } from '../../components/Navigation/Tabs/Tabs';
import { Tabs } from '@mantine/core';
import { Flex } from '../../components/Layout/Flex/Flex';
import { Container } from '../../components/Layout/Container/Container';

export const Header = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container
      fluid
      sx={{
        backgroundColor: 'white'
      }}
      p={0}
    >
      <Container size="xl">
        <Flex
          gap="xl"
          justify="space-between"
          align="center"
          wrap="wrap"
          sx={{ height: '100px' }}
        >
          Logo
          <Tabs
            value={location.pathname}
            onTabChange={(value) => navigate(`${value}`)}
          >
            <Tabs.List>
              <Tabs.Tab value="/">Home</Tabs.Tab>
              <Tabs.Tab value="/setup">Setup</Tabs.Tab>
              <Tabs.Tab value="/configurations">Configurations</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Flex>
      </Container>
    </Container>
  );
};
