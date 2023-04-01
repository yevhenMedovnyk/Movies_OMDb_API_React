import {Link} from 'react-router-dom'
import styles from "./Login.module.scss";

import close from "./../../images/burger-close.svg";

const Login = ({isPopupOpened, setIsPopupOpened}) => {
  const closePopup = () => {
    setIsPopupOpened(false);
  };

  return (
    <div className={[styles.cover, isPopupOpened ? styles.opened : ""].join(" ")}>
      <form className={styles.popup}>
        <img onClick={closePopup} className={styles.close} src={close} alt='close' />
        <h1 className={styles.title}>Welcome</h1>
        <input placeholder='Enter your email' type='text' className={styles.input} />
        <input placeholder='Password' type='password' className={styles.input} />
        <div className={styles.btns}>
          <Link className={styles.forget} to='#'>Forgot your password?</Link>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
