import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Layout from '@/components/Layout';
import CreateUserDialog from '@/components/CreateUserDialog';
import UserList from '@/components/UserList';
import { User } from '@/types/user';
import { userService, getAuthToken, setAuthToken } from '@/services/api';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Error fetching users',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await getAuthToken();
        setAuthToken(token);
        await fetchUsers();
      } catch (error) {
        console.error('Initialization error:', error);
        toast({
          title: 'Error initializing app',
          status: 'error',
          description: 'Please check your API configuration',
          isClosable: true,
        });
      }
    };

    initializeApp();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Layout>
      <Box px={4} maxW="1200px" mx="auto">
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
          <Heading size="lg">User Management</Heading>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Box>

        {/* Action Section */}
        <Box mb={8}>
          <Button
            onClick={onOpen}
            colorScheme="blue"
            size="md"
          >
            Add New User
          </Button>
        </Box>

        {/* Main Content */}
        <Box>
          <UserList users={users} onUserDeleted={fetchUsers} />
        </Box>

        {/* Dialog */}
        <CreateUserDialog
          isOpen={isOpen}
          onClose={onClose}
          onUserCreated={fetchUsers}
        />
      </Box>
    </Layout>
  );
}
