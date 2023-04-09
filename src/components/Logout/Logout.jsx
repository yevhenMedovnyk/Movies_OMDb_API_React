import {useDispatch} from "react-redux";
import {removeUser} from "../../features/userSlice";
import styles from "./Logout.module.scss";


const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
	  dispatch(removeUser());
  };

  return (
    <div className={styles.popup}>
      <button onClick={handleClick} className={styles.btn}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
