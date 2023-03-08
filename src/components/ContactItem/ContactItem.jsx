import { Avatar, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { RiEditLine } from 'react-icons/ri';
import { BiPhoneCall } from 'react-icons/bi';
import { createPortal } from 'react-dom';
import { ModalWrap } from 'components/ModalWrap/ModalWrap';
import { EditModal } from 'components/EditModal/EditModal';
import { deleteContact } from 'components/redux/contacts/contactOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from 'components/redux/contacts/contactSelectors';

const modalRoot = document.querySelector('#modal-root');

export const ContactItem = ({ id, name, number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  return (
    <Flex key={id} alignItems="center" justifyContent={'space-between'}>
      <Avatar name={name} colorScheme="twitter" size={['sm', 'md', 'md']} />
      <Text fontSize={['sm', 'md', 'xl']} as="cite">
        {' '}
        {name}:
      </Text>
      <Text fontSize={['sm', 'md', 'xl']}> {number}</Text>
      <Flex gap={{ base: '5px', md: '15px', xl: '20px' }}>
        <Button
          variant="outline"
          colorScheme="teal"
          padding={['5px', '10px', '13px']}
          size={['xs', 'md', 'xl']}
          fontSize={['sm', 'md', 'md']}
        >
          <a href={`tel:${number}`}>
            <BiPhoneCall />
          </a>
        </Button>
        <Button
          padding={['5px', '10px', '13px']}
          fontSize={['sm', 'md', 'lg']}
          size={['xs', 'md', 'xl']}
          isLoading={loading}
          colorScheme="red"
          variant="outline"
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </Button>
        <Button
          onClick={onOpen}
          variant="outline"
          colorScheme="yellow"
          size={['xs', 'md', 'xl']}
          padding={['5px', '10px', '13px']}
        >
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
