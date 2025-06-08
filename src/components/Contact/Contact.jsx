import { useDispatch } from 'react-redux';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { deleteContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div>
      <div>
        <p>
          <FaUser size={20} className={css.icon} />
          {contact.name}
        </p>
        <p>
          <FaPhoneAlt size={20} className={css.icon}/>
          {contact.number}
        </p>
      </div>
      <div>
        {}
        <button  className={css.editButton} type="button">Edit</button>
        <button   className={css.deleteButton} onClick={handleDeleteClick} type="button">
          Delete
        </button>
      </div>
    </div>
  );
}
