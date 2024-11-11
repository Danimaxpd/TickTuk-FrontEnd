import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { CreateUserInput } from '@/types/user';
import { userService } from '@/services/api';
import { AxiosError } from 'axios';

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

export default function CreateUserDialog({
  isOpen,
  onClose,
  onUserCreated,
}: CreateUserDialogProps) {
  const toast = useToast();

  const initialFormData: CreateUserInput = {
    firstName: '',
    lastName: '',
    email: '',
    gender: 'other',
    password: '',
    description: '',
  };

  const [formData, setFormData] = useState<CreateUserInput>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    try {
      await userService.createUser(formData);
      toast({
        title: 'User created successfully',
        status: 'success',
      });
      resetForm();
      onUserCreated();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: `Error creating user: ${error instanceof AxiosError ? error.response?.data?.message : error instanceof Error ? error.message : 'Unknown error'}`,
        status: 'error',
      });
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New User</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              value={formData.firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={formData.lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Gender</FormLabel>
            <Select
              value={formData.gender}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData({
                  ...formData,
                  gender: e.target.value as 'male' | 'female' | 'other',
                })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              maxLength={200}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create User</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
