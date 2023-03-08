import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  AddContactSuccessNot,
  AddContactErrorNot,
  EditContactSuccessNot,
  EditContactErrorNot,
  DeleteContactSuccessNot,
  DeleteContactErrorNot,
} from 'components/utiles';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {
        name,
        number,
      });
      AddContactSuccessNot();
      return response.data;
    } catch (e) {
      AddContactErrorNot();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      DeleteContactSuccessNot();
      return response.data;
    } catch (e) {
      DeleteContactErrorNot();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (updatedContact, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${updatedContact.id}`, {
        name: updatedContact.name,
        number: updatedContact.number,
      });
      EditContactSuccessNot();
      return response.data;
    } catch (e) {
      EditContactErrorNot();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
