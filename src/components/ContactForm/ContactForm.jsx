import React from 'react';
import { nanoid } from 'nanoid';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { selectContacts } from 'components/redux/contacts/contactSelectors';

import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';

import { addContact } from 'components/redux/contacts/contactOperations';

import { Notification, patternName } from 'components/utiles';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  name: '',
  number: '',
};

const nameId = nanoid();
const numberId = nanoid();

export const ContactForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const data = useSelector(selectContacts);
  const dispatch = useDispatch();

  const formSubmitHandler = (_, { resetForm }) => {
    const invalidName = data?.find(state => state.name === name);

    if (invalidName) {
      Notification(name);
      resetForm();
      return;
    }
    dispatch(addContact({ name, number }));
    onClose();
    resetForm();
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Add new contact</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Formik initialValues={initialValues} onSubmit={formSubmitHandler}>
            {props => (
              <Form>
                <Field name="name" id={nameId}>
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Name</FormLabel>
                      <Input
                        {...field}
                        value={name}
                        type="text"
                        placeholder="John Doe"
                        _placeholder={{ opacity: 1, color: 'teal.700' }}
                        pattern={patternName}
                        onChange={e => setName(e.target.value)}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="number" patern={patternName} id={numberId}>
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      mt={4}
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Nunber</FormLabel>
                      <Input
                        {...field}
                        value={number}
                        type="telephone"
                        placeholder="0960000000"
                        _placeholder={{ opacity: 1, color: 'teal.700' }}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        onChange={e => setNumber(e.target.value)}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};
