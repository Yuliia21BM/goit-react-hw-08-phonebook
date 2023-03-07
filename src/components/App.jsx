import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';

import { getIsRefreshingUser } from './redux/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { SharedLayout } from './SharedLayout';
import { refreshUser } from './redux/auth/authOperations';

const DefaultPage = lazy(() => import('../pages/DefaultPage/DefaultPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  const isRefresed = useSelector(getIsRefreshingUser);
  return isRefresed ? (
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
