
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import Loader from './components/Loader/Loader';


import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="register"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<RegistrationPage/>}/>
            }
          />

          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<LoginPage/>} />
            }
          />

          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage/>} />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;