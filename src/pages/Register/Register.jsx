import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={styles.wrapper}>
      <RegisterForm />
    </div>
  );
};

export default Register;
