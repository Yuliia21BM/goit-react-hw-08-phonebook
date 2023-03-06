import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
// import { useCurrentUserQuery } from './redux/authApi';
import axios from 'axios';

import { selectIsRefreshing, selectToken } from './redux/selectors';

import { SharedLayout } from './SharedLayout';
import { useSelector } from 'react-redux';
const DefaultPage = lazy(() => import('../pages/DefaultPage/DefaultPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

export const App = () => {
  // const { data, isFetching } = useCurrentUserQuery();
  // console.log(data, isFetching);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) return;
    const refreshUser = async () => {
      try {
        console.log(token);
        const refreshedUser = await axios.get(
          'https://connections-api.herokuapp.com/users/current',
          // 'https://goit-task-manager.herokuapp.com/users/current',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(refreshedUser);
      } catch (error) {
        console.log(error);
      }
    };
    refreshUser().then(res => console.log(res));
  }, [token]);

  return !selectIsRefreshing ? (
    <div>Refreshing...</div>
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<DefaultPage />} />
    </Routes>
  );
};
