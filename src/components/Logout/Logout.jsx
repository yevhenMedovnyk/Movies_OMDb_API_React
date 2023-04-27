import {useDispatch} from "react-redux";
import {removeUser} from "../../redux/slices/userSlice";
import {clearWantList, clearWatchedList} from "../../redux/slices/movieSlice";
import styles from "./Logout.module.scss";

const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeUser());
    dispatch(clearWantList());
    dispatch(clearWatchedList());
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
