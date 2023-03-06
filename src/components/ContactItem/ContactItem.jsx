import { Avatar, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { RiEditLine } from 'react-icons/ri';
import { BiPhoneCall } from 'react-icons/bi';
import { useDeleteContactMutation } from 'components/redux/contactsApi';
import { createPortal } from 'react-dom';
import { ModalWrap } from 'components/ModalWrap/ModalWrap';
import { EditModal } from 'components/EditModal/EditModal';

const modalRoot = document.querySelector('#modal-root');

export const ContactItem = ({ id, name, number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteContact, { isLoading: loading }] = useDeleteContactMutation();
  return (
    <Flex key={id} alignItems="center" justifyContent={'space-between'}>
      <Avatar name={name} colorScheme="twitter" size="md" />
      <Text fontSize="xl" as="cite">
        {' '}
        {name}:
      </Text>
      <Text fontSize="xl"> {number}</Text>
      <Flex gap={'20px'}>
        <Button variant="outline" colorScheme="teal">
          <a href={`tel:${number}`}>
            <BiPhoneCall />
          </a>
        </Button>
        <Button
          isLoading={loading}
          colorScheme="red"
          variant="outline"
          onClick={() => deleteContact(id)}
        >
          Delete
        </Button>
        <Button onClick={onOpen} variant="outline" colorScheme="yellow">
          <RiEditLine />
        </Button>
      </Flex>
      {createPortal(
        <ModalWrap isOpen={isOpen} onClose={onClose}>
          <EditModal onClose={onClose} name={name} number={number} id={id} />
        </ModalWrap>,
        modalRoot
      )}
    </Flex>
  );
};
