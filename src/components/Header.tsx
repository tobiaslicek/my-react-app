import {
  Box,
  Button,
  Drawer,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { ROUTES } from '../constants';

const HamburgerIcon = () => (
  <Box aria-hidden w="6" h="5" display="flex" flexDirection="column" justifyContent="space-between">
    <Box w="100%" h="0.25rem" bg="currentColor" borderRadius="sm" />
    <Box w="100%" h="0.25rem" bg="currentColor" borderRadius="sm" />
    <Box w="100%" h="0.25rem" bg="currentColor" borderRadius="sm" />
  </Box>
);

const navItems = [
  { label: 'Home', path: ROUTES.main },
  { label: 'Pet List', path: ROUTES.petList },
] as const;

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate(ROUTES.login);
  };

  return (
    <Box bg="gray.800" px={6} py={4}>
      <Flex align="center">
        <Text fontSize="lg" fontWeight="bold" color="white">
          MyApp
        </Text>

        <Spacer />

        {isAuthenticated && (
          <>
            {/* Desktop menu – skryté do 768px */}
            <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  color="white"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
              <Button colorScheme="blue" onClick={handleLogout}>
                Odhlásit
              </Button>
            </Flex>

            {/* Hamburger – pouze do 768px (max-width 768px) */}
            <Box display={{ base: 'block', md: 'none' }}>
              <Drawer.Root
                open={mobileMenuOpen}
                onOpenChange={(e) => setMobileMenuOpen(e.open)}
                placement="end"
                size="sm"
              >
                <Drawer.Trigger
                  asChild
                  aria-label="Otevřít menu"
                >
                  <Button variant="ghost" color="white" p={2} minW="auto">
                    <HamburgerIcon />
                  </Button>
                </Drawer.Trigger>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Menu</Drawer.Title>
                      <Drawer.CloseTrigger asChild>
                        <Button variant="ghost" size="sm" aria-label="Zavřít menu">
                          ×
                        </Button>
                      </Drawer.CloseTrigger>
                    </Drawer.Header>
                    <Drawer.Body pt={0}>
                      <Flex direction="column" gap={2}>
                        {navItems.map((item) => (
                          <Button
                            key={item.path}
                            variant="ghost"
                            justifyContent="flex-start"
                            onClick={() => handleNav(item.path)}
                          >
                            {item.label}
                          </Button>
                        ))}
                        <Button
                          colorScheme="blue"
                          justifyContent="flex-start"
                          onClick={handleLogout}
                        >
                          Odhlásit
                        </Button>
                      </Flex>
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Drawer.Root>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};
