import React from 'react';
import { nanoid } from 'nanoid';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';

import { editContact } from 'components/redux/contacts/contactOperations';
import { patternName } from 'components/utiles';
import { useDispatch } from 'react-redux';

const initialValues = {
  name: '',
  number: '',
};

const nameId = nanoid();
const numberId = nanoid();

export const EditModal = ({
  onClose,
  name: prevName,
  number: prevNumber,
  id,
}) => {
  const [name, setName] = useState(prevName);
  const [number, setNumber] = useState(prevNumber);
  const dispatch = useDispatch();

  const formSubmitHandler = (_, { resetForm }) => {
    dispatch(editContact({ name, number, id }));
    onClose();
    resetForm();
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading fontSize={['xl', '2xl', '3xl']}>Edit contact</Heading>
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
                      <FormLabel fontSize={['sm', 'md', 'lg']}>Name</FormLabel>
                      <Input
                        {...field}
                        value={name}
                        type="text"
                        placeholder="John Doe"
                        _placeholder={{ opacity: 1, color: 'teal.700' }}
                        pattern={patternName}
                        fontSize={['sm', 'md', 'lg']}
                        onChange={e => setName(e.target.value)}
                      />
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
                      <FormLabel fontSize={['sm', 'md', 'lg']}>
                        Nunber
                      </FormLabel>
                      <Input
                        {...field}
                        value={number}
                        type="telephone"
                        fontSize={['sm', 'md', 'lg']}
                        placeholder="0960000000"
                        _placeholder={{ opacity: 1, color: 'teal.700' }}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        onChange={e => setNumber(e.target.value)}
                      />
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  colorScheme="yellow"
                  variant="outline"
                  width="full"
                  fontSize={['sm', 'md', 'lg']}
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
