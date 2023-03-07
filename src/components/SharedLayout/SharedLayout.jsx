import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ImAddressBook, ImHeart } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getIsLoggedIn, getUser } from 'components/redux/auth/authSelectors';
import { ToastContainer } from 'react-toastify';
import {
  useDisclosure,
  Button,
  Flex,
  Spacer,
  Link,
  Box,
  useColorMode,
  Text,
} from '@chakra-ui/react';

import { Spinner } from 'components/utiles/spinner';

import { logOutUser } from 'components/redux/auth/authOperations';
import { ModeSwitcherBTN } from 'components/ModeSwitcherBTN';
import { Container } from 'components/utiles';
import { LoginModal } from 'components/LoginModal/LoginModal';
import { SignupModal } from 'components/SignupModal/SignupModal';
import { useNavigate } from 'react-router-dom';

const StyledLink = styled(Link)`
  display: flex;
  gap: 5px;
  justify-content: center;
  font-size: 24px;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  transition: background-color linear 150ms;
  &:hover,
  &:focus {
    background-color: ${({ mode }) => {
      return mode === 'light' ? '#f7f7f7e7' : '#ffffff1d';
    }};
  }
  &.active {
    text-decoration: underline 2px solid currentColor;
  }
`;

const modalRoot = document.querySelector('#modal-root');

export const SharedLayout = () => {
  const loginModal = useDisclosure();
  const signupModal = useDisclosure();
  const { colorMode } = useColorMode();
  const name = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(getIsLoggedIn);

  const handleLogOutClick = () => {
    dispatch(logOutUser());
    navigate('/');
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      minHeight={'100vh'}
      bg={colorMode === 'dark' ? 'dark' : '#c3e8da93'}
    >
      <Box as="header" bg={colorMode === 'dark' ? '#dbfff194' : '#62c29de8'}>
        <Container>
          <Flex>
            <Flex alignItems="center" gap="20px">
              <StyledLink
                as={NavLink}
                to="/"
                display={'flex'}
                gap={'5px'}
                variant="ghost"
                mode={colorMode}
              >
                ContactBook
                <ImAddressBook />
              </StyledLink>
              <Spacer />
              {isLoggedIn && (
                <StyledLink
                  as={NavLink}
                  to="contacts"
                  variant="ghost"
                  mode={colorMode}
                >
                  Contacts
                </StyledLink>
              )}
            </Flex>
            <Spacer />
            <Flex alignItems="center" gap="20px">
              <ModeSwitcherBTN />
              {!isLoggedIn ? (
                <>
                  <Button
                    colorScheme="teal"
                    onClick={loginModal.onOpen}
                    fontSize="lg"
                  >
                    Log in
                  </Button>
                  <Button
                    colorScheme="yellow"
                    onClick={signupModal.onOpen}
                    fontSize="lg"
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  <Text>Wellcome, dear {name} :)</Text>
                  <Button
                    colorScheme="yellow"
                    fontSize="lg"
                    onClick={handleLogOutClick}
                  >
                    Log out
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Box as="footer" marginTop={'auto'}>
        <Container>
          <Flex gap="5px" alignItems={'center'} justifyContent={'center'}>
            <ImHeart color="teal" width="10px" />
            <Text textAlign={'center'} fontSize="sm">
              If you find some problem or you have some idea how to improve this
              app, please write me a
              <Link
                href="mailto: yuliiamykhailiuk480@gmail.com"
                ml={'4px'}
                textDecoration={'underline'}
              >
                letter
              </Link>
            </Text>
            <ImHeart color="#ffdd02" width="10px" />
          </Flex>
        </Container>
      </Box>
      {createPortal(
        <LoginModal isOpen={loginModal.isOpen} onClose={loginModal.onClose} />,
        modalRoot
      )}
      {createPortal(
        <SignupModal
          isOpen={signupModal.isOpen}
          onClose={signupModal.onClose}
        />,
        modalRoot
      )}
      <ToastContainer autoClose={3000} />
    </Box>
  );
};
