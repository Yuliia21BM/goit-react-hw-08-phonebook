import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filterSlice } from './contacts/filterSlice';
// import { contactsApi } from './contactsApi';
// import { authApi } from './authApi';
import { contactsReducer } from './contacts/contactSlice';
import { authSlice } from './auth/authSlice';

const authPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    contacts: contactsReducer,
    // [contactsApi.reducerPath]: contactsApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
  // .concat(contactsApi.middleware)
  // .concat(authApi.middleware),
});

export const persistor = persistStore(store);
