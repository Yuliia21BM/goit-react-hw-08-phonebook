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
import { ModalWrap } from 'components/ModalWrap/ModalWrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setLoggedIn, setUser } from 'components/redux/authSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSignupUserMutation } from 'components/redux/authApi';
import { SignUpSuccessNot, SignUErrorNot } from 'components/utiles';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const SignupModal = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPasword, setUserPasword] = useState('');
  const [show, setShow] = useState(false);
  const [signupUser] = useSignupUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (_, { resetForm }) => {
    signupUser({
      name: userName,
      email: userEmail,
      password: userPasword,
    })
      .then(response => {
        console.log(response);
        const { token, user } = response.data;
        dispatch(setUser(user));
        dispatch(setToken(token));
        dispatch(setLoggedIn(true));
        SignUpSuccessNot();
        onClose();
        navigate('/contacts');
      })
      .catch(() => {
        dispatch(setUser({}));
        dispatch(setToken(''));
        dispatch(setLoggedIn(false));
        SignUErrorNot();
      })
      .finally(() => resetForm());
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
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {props => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                          title="Please enter your user name."
                          {...field}
                          value={userName}
                          type="text"
                          placeholder="John Doe"
                          _placeholder={{ opacity: 1, color: 'teal.700' }}
                          onChange={e => setUserName(e.target.value)}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl mt={6} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          title="Please enter your user email."
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
                            title="7 characters minimum"
                            min={7}
                            {...field}
                            value={userPasword}
                            placeholder="*******"
                            pattern=".{7,}"
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
                    Sign Up
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
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={userName}
                  type="text"
                  placeholder="John Doe"
                  _placeholder={{ opacity: 1, color: 'teal.700' }}
                  onChange={e => setUserName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={userEmail}
                  type="email"
                  placeholder="test@test.com"
                  _placeholder={{ opacity: 1, color: 'teal.700' }}
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
                colorScheme="yellow"
                variant="outline"
                width="full"
                mt={6}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex> */}
    </ModalWrap>
  );
};
