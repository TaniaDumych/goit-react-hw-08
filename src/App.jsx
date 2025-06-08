
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';





const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="register"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />
            }
          />

          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
            }
          />

          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
