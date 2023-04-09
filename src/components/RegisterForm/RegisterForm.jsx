import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "./../../features/userSlice";
import FormInput from "../FormInput/FormInput";
import styles from "./RegisterForm.module.scss";

import close from "./../../images/burger-close.svg";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.username && values.password && values.confirmPassword) {
      const auth = getAuth();
      console.log(auth);
      createUserWithEmailAndPassword(auth, values.username, values.password)
        .then(({user}) => {
          console.log(user);
          dispatch(
            setUser({
              email: user.email,
              token: user.accessToken,
              id: user.uid,
            }),
          );
        })
        .catch(console.error);
      navigate("/");
    }
  };
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
    {
      id: 3,
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
      errorMessage: "Passwords do NOT match",
      pattern: values.password,
      required: true,
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.popup}>
        <img onClick={() => navigate(-2)} className={styles.close} src={close} alt='close' />
        <h1 className={styles.title}>Register</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange} />
        ))}
        <div className={styles.btns}>
          <span className={styles.forget} to='#'>
            Already have an account? <Link to='/login'>Sign in</Link>
          </span>
          <button
            disabled={!values.username || !values.password || !values.confirmPassword ? true : false}
            className={styles.loginBtn}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
