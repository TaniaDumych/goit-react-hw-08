import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    number: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ name: values.name, phone: values.number }));
    resetForm(); 
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form  className="contact-form-container">
        <label className="contact_form">
          Name
          <Field className="contact_form_field" type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </label>
        <label className="contact_form">
          Number
          <Field className="contact_form_field" type="text" name="number" />
          <ErrorMessage name="number" component="div" />
        </label>

        <button className="button-btn" type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;