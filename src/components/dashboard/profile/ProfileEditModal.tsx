/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Center,
  Heading,
  Stack,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  Textarea,
  IconButton,
  Button,
  Drawer,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { useLocalStore } from 'src/app/localStore';
import { useProfileStore } from 'src/app/profileStore';
import { IProfile } from 'src/definitions/IUser';
import { ErrorMessage } from '@hookform/error-message';

const EditProfileComponent = ({ isOpen, onOpen, onClose }: any) => {
  const setProfile = useProfileStore((state: any) => state.setProfile);
  const { userProfile, pubKey } = useProfileStore();
  const { edit_mode, set_edit_mode } = useLocalStore();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: userProfile.name,
      userName: userProfile.userName,
      about: userProfile.about,
      image: userProfile.image,
    },
  });

  console.log('edit more from profile component -', edit_mode);

  useEffect(() => {
    console.log('editMode state changed', edit_mode);
    if (edit_mode) {
      console.log('editMode set to true');
      isOpen;
    }
  }, [edit_mode]);

  function onSubmit(values: any) {
    const { name, userName, image, about } = values;
    const data: IProfile = { name, userName, about, image };
    setProfile(data, pubKey);
    set_edit_mode(false);
    onClose();
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      scrollBehavior='outside'
      size='xl'
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your Profile</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display='flex' flexDirection={'column'} gap='1rem' pb={6}>
            {/* Full Name */}
            <FormControl isRequired>
              <FormLabel htmlFor='name'>Full name</FormLabel>
              <Input
                isRequired
                id='name'
                placeholder='Name'
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message:
                      'Entered value cant start/end or contain only white spacing',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name='name'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*userName */}
            <FormControl isRequired>
              <FormLabel htmlFor='name'>User Name</FormLabel>
              <InputGroup>
                <InputLeftAddon>@</InputLeftAddon>
                <Input
                  isRequired
                  type='text'
                  id='userName'
                  placeholder='User Name'
                  {...register('userName', {
                    required: 'This is Required',
                    minLength: {
                      value: 5,
                      message: 'minimum number of character for username is 5',
                    },
                    pattern: {
                      value: /^\w[a-zA-Z@#0-9.]*$/,
                      message: 'User Name can not contain white spacing',
                    },
                  })}
                />
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name='userName'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/*Profile Picture URL */}
            <FormControl>
              <FormLabel htmlFor='image'>Profile Picture</FormLabel>
              <InputGroup>
                <InputLeftAddon>URL:</InputLeftAddon>
                <Input
                  type='url'
                  id='image'
                  placeholder='Image URL'
                  {...register('image', {
                    pattern: {
                      value:
                        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                      message: 'Enter a Valid URL',
                    },
                  })}
                />
              </InputGroup>
              <ErrorMessage
                errors={errors}
                name='image'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>

            {/* About */}
            <FormControl>
              <FormLabel htmlFor='name'>About</FormLabel>
              <Textarea
                id='about'
                placeholder='About You'
                {...register('about', {
                  maxLength: {
                    value: 200,
                    message: 'Maximum length should be 200',
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name='about'
                render={({ message }) => (
                  <Text fontSize='sm' color='red.500' py='0.5rem'>
                    {message}
                  </Text>
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              type='submit'
              colorScheme='blue'
              mr={3}
            >
              Save
            </Button>
            <Button variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileComponent;
