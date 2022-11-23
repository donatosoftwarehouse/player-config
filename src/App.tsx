import React from 'react';
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import theme from './theme/lightTheme';
import './App.css';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <RouterProvider router={routes} />
    </MantineProvider>
  );
}

export default App;
