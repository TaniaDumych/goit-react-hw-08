import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthNav.module.css';

const builtClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function AuthNav() {
  return (
    <div className={css.nav}>
      <NavLink className={builtClassName} to="/register">
        Register
      </NavLink>
      <NavLink className={builtClassName} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
