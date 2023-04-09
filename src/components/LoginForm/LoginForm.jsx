import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "./../../features/userSlice";

import styles from "./LoginForm.module.scss";

import close from "./../../images/burger-close.svg";
import FormInput from "../FormInput/FormInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.username && values.password) {
      const auth = getAuth();
      console.log(auth);
      signInWithEmailAndPassword(auth, values.username, values.password)
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
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.popup}>
        <img onClick={() => navigate('/')} className={styles.close} src={close} alt='close' />
        <h1 className={styles.title}>Welcome</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange} />
        ))}
        <div className={styles.btns}>
          <span className={styles.forget} to='#'>
            Already haven't an account? <Link to='/register'>Register</Link>
          </span>
          <button
            disabled={!values.username || !values.password ? true : false}
            className={styles.loginBtn}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
