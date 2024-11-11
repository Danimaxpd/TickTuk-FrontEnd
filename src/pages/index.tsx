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
        const token = await getAuthToken('your-api-key');
        setAuthToken(token);
        await fetchUsers();
      } catch (error) {
        toast({
          title: 'Error initializing app',
          status: 'error',
        });
      }
    };

    initializeApp();
  }, []);

  return (
    <Layout>
      <Box mb={6}>
        <Heading mb={4}>User Management</Heading>
        <Button onClick={onOpen}>Add New User</Button>
      </Box>

      <UserList users={users} onUserDeleted={fetchUsers} />

      <CreateUserDialog
        isOpen={isOpen}
        onClose={onClose}
        onUserCreated={fetchUsers}
      />
    </Layout>
  );
}
