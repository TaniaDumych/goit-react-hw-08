import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from '../../redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactList from '../../components/ContactList/ContactList';
import ContactForm from '../../components/ContactForm/ContactForm';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';


import SearchBox from '../../components/SearchBox/SearchBox';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactForm />
      <SearchBox />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !error && <ContactList />}
    </>
  );
};

export default ContactsPage;
