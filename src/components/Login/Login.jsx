import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import styles from "./Login.module.scss";

import close from "./../../images/burger-close.svg";
import FormInput from "../FormInput/FormInput";

const inputs = [
  {
    id: 1,
    name: "username",
    placeholder: "Enter your email",
    type: "email",
    errorMessage: "It should be a valid email address!",
    required: true,
  },
  {
    id: 2,
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    errorMessage: "Password should be 8-16 characters and shouldn't include any special symbols",
    pattern: "^[A-Za-z0-9]{8,16}",
    required: true,
  },
];

const Login = ({isPopupOpened, setIsPopupOpened}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const closePopup = () => {
    setIsPopupOpened(false);
  };
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.username && values.password) {
      navigate("/");
      setIsPopupOpened(false);
    }
  };

  return (
    <div className={[styles.cover, isPopupOpened ? styles.opened : ""].join(" ")}>
      <form onSubmit={handleSubmit} className={styles.popup}>
        <img onClick={closePopup} className={styles.close} src={close} alt='close' />
        <h1 className={styles.title}>Welcome</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange} />
        ))}
        <div className={styles.btns}>
          <Link className={styles.forget} to='#'>
            Forgot your password?
          </Link>
          <button
            disabled={!values.username || !values.password ? true : false}
            className={styles.loginBtn}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
