import { useState } from 'react';
import {
  Button,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { loginUser } from 'components/redux/auth/authOperations';

import { ModalWrap } from 'components/ModalWrap/ModalWrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

export const LoginModal = ({ isOpen, onClose }) => {
  const [userPasword, setUserPasword] = useState('');
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmiLogimForm = () => {
    console.log('Log in');
    dispatch(
      loginUser({
        email: userEmail,
        password: userPasword,
      })
    );
    onClose();
    setUserEmail('');
    setUserPasword('');
    navigate('/contacts');
  };

  return (
    <ModalWrap isOpen={isOpen} onClose={onClose}>
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        onClose={onClose}
      >
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Log in</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmiLogimForm}
            >
              {props => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl mt={6} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          {...field}
                          value={userEmail}
                          type="email"
                          placeholder="test@test.com"
                          _placeholder={{ opacity: 1, color: 'teal.700' }}
                          onChange={e => setUserEmail(e.target.value)}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl mt={6} isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            value={userPasword}
                            placeholder="*******"
                            _placeholder={{ opacity: 1, color: 'yellow.700' }}
                            onChange={e => setUserPasword(e.target.value)}
                            type={show ? 'text' : 'password'}
                          />
                          <InputRightElement>
                            <Button
                              bgColor="transparent"
                              border="none"
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShow(!show)}
                            >
                              {show ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    type="submit"
                    colorScheme="yellow"
                    variant="outline"
                    width="full"
                    mt={6}
                  >
                    Log in
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
      {/* <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmiLogimForm}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={userEmail}
                  type="email"
                  placeholder="test@test.com"
                  _placeholder={{ opacity: 1, color: 'yellow.700' }}
                  onChange={e => setUserEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={userPasword}
                    placeholder="*******"
                    _placeholder={{ opacity: 1, color: 'yellow.700' }}
                    onChange={e => setUserPasword(e.target.value)}
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement>
                    <Button
                      bgColor="transparent"
                      border="none"
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                variant="outline"
                width="full"
                mt={6}
                onClick={onClose}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex> */}
    </ModalWrap>
  );
};
