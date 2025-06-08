import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './LoginForm.module.css';


const loginSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});





const initialValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success('Login success');
        resetForm();
      })
      .catch(error => {
        console.log('Login error:', error);
      
        
        if (typeof error === 'string') {
          toast.error(error);
        }
      
        else if (error?.message?.includes('Unauthorized')) {
          toast.error('Incorrect email or password');
        } 
        
        
        else {
          toast.error('Something went wrong. Try again.');
        }
      });
      
  }    
  

  const emailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
      initialValues={initialValues}
    >
      <Form className={css.form}>
        <label className={css.labelName} htmlFor={emailFieldId}>
          <b>Email</b>
          <Field
            className={css.inputName}
            id={emailFieldId}
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" component="span" className={css.error} />

        </label>
        <label className={css.labelName} htmlFor={passwordFieldId}>
          <b>Password</b>
          <Field
            className={css.inputName}
            id={passwordFieldId}
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" component="span" className={css.error} />
        </label>
        <button className={css.button} type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
}
