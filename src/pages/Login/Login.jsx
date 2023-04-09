import styles from "./Login.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};

export default Login;
