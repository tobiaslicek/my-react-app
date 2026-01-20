import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />

      {/* Main content */}
      <Box flex="1" px={6} py={8}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};
