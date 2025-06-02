import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { IoPerson } from "react-icons/io5";
import { ImPhone } from "react-icons/im";

const Contact = ({ name, number, id, }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <div >
        <h3><IoPerson /> {name}</h3>
        <p><ImPhone /> {number}</p>
      </div>
      <button onClick={handleDelete} type="button">
        Delete
      </button>
    </div>
  );};

export default Contact;
