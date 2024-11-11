import {
  Box,
  Text,
  SimpleGrid,
  Button,
  useToast,
  Tooltip,
  HStack,
  Card,
  CardBody,
  CardFooter,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { userService } from '@/services/api';

interface UserListProps {
  users: User[];
  onUserDeleted: () => void;
}

export default function UserList({ users, onUserDeleted }: UserListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const usersPerPage = 3;

  useEffect(() => {
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [users.length, currentPage]);

  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser(id);
      toast({
        title: 'User deleted successfully',
        status: 'success',
      });
      onUserDeleted();
    } catch (error) {
      toast({
        title: 'Error deleting user',
        status: 'error',
      });
    }
  };

  const sortedUsers = [...users].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        {currentUsers.map((user) => (
          <Card key={user.id}>
            <CardBody>
              <Heading size="md" mb={2}>
                {`${user.lastName}, ${user.firstName}`}
              </Heading>
              <Text mb={2}>{user.email}</Text>
              <Text mb={2}>Gender: {user.gender}</Text>
              <Tooltip label={user.description || 'No description'}>
                <Text cursor="pointer" color="blue.500">
                  More details
                </Text>
              </Tooltip>
            </CardBody>
            <CardFooter>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {totalPages > 1 && (
        <HStack justify="center" spacing={2}>
          <Button
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            isDisabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
}
