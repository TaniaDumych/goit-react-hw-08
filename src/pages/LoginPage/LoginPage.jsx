import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';


const LoginPage = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;