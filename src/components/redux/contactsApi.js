import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    // baseUrl: 'https://63ee9f6d5e9f1583bdc58f87.mockapi.io/contacts',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => ({
        url: `/contacts`,
        method: 'GET',
      }),
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: newContact => ({
        url: `/contacts`,
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    // updateContact: builder.mutation({
    //   query: updatedContact => ({
    //     url: `/contacts/${updatedContact.id}`,
    //     method: 'POST',
    //     body: { name: updatedContact.name, number: updatedContact.number },
    //   }),
    //   invalidatesTags: ['Contact'],
    // }),
    updateContact: builder.mutation({
      queryFn(arg, { getState }, extraOptions, baseQuery) {},
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
