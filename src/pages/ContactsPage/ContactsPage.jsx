import { createPortal } from 'react-dom';
import { useDisclosure, Button, Box, Flex } from '@chakra-ui/react';

import { Container } from 'components/utiles';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { ModalWrap } from 'components/ModalWrap/ModalWrap';
import { TbUserPlus } from 'react-icons/tb';
import { Spinner } from 'components/utiles/spinner';
import {
  selectIsLoading,
  selectError,
} from 'components/redux/contacts/contactSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'components/redux/contacts/contactOperations';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const ContactsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Box p="10px" position="relative">
          <Button
            variant="outline"
            position={'absolute'}
            top="20px"
            right={['0', '0', '10px']}
            colorScheme="teal"
            onClick={onOpen}
            size={['sm', 'md', 'xl']}
            padding={['5px', '10px', '15px']}
          >
            <TbUserPlus enableBackground={'teal'} size="1.3em" />
          </Button>
          <Flex justifyContent={'center'}>
            <Filter />
          </Flex>
          {isLoading && !error && <Spinner />}
          <ContactList />
        </Box>
        {createPortal(
          <ModalWrap isOpen={isOpen} onClose={onClose}>
            <ContactForm onClose={onClose} />
          </ModalWrap>,
          modalRoot
        )}
      </Container>
    </>
  );
};

export default ContactsPage;
