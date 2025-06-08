import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';


const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    id: '',
    name: '',
    number: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
  });

  const handleSubmit = (values, actions) => {
    values.id = nanoid();
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <section className="section">
      <div className="container">
        <h1  className={css.name} >Phonebook</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <label className={css.label} >
              <b>Name</b>
              <Field className={css.input}
                
                type="text"
                name="name"
                placeholder="Contact name"
              />
              <ErrorMessage name="name" component="div" />
            </label>

            <label className={css.label}>
              <b>Number</b>
              <Field className={css.input}
               
                type="text"
                name="number"
                placeholder="123-45-67"
              />
              <ErrorMessage name="number" component="div" />
            </label>
            <button className={css.button} type="submit">
              Add Contact
              <FaUserPlus className={css.icon} size={20}  />
              
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default ContactForm;