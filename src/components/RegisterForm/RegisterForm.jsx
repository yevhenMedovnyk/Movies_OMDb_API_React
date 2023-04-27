import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";

import {db, storage} from "../../firebase";
import {useDispatch} from "react-redux";
import {setUser, setUserAvatar} from "./../../redux/slices/userSlice";
import FormInput from "../FormInput/FormInput";
import styles from "./RegisterForm.module.scss";

import close from "./../../images/burger-close.svg";
import add from "./../../images/addFile.svg";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);
  const {avatarUrl} = useSelector((state) => state.user);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const uploadAvatar = () => {
      const name = new Date().getDate() + avatar.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //  console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              //  console.log("Upload is paused");
              break;
            case "running":
              //  console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const res = await getDownloadURL(uploadTask.snapshot.ref);
          dispatch(setUserAvatar({avatar: res}));
        },
      );
    };
    avatar && uploadAvatar();
  }, [avatar]);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleChangeFileInput = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.username && values.password && values.confirmPassword) {
      const auth = getAuth();
      try {
        const res = await createUserWithEmailAndPassword(auth, values.username, values.password);
        dispatch(
          setUser({
            email: res.user.email,
            token: res.user.accessToken,
            id: res.user.uid,
          }),
        );
        await setDoc(doc(db, "users", res.user.uid), {
          email: res.user.email,
          id: res.user.uid,
          avatar: avatarUrl,
        });
      } catch (error) {
        console.log(error);
      }
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
        <label className={styles.label} htmlFor='addAvatar'>
          <img  src={add} style={{width: "30px"}} alt='add file' />
        </label>
        <input
          id='addAvatar'
          style={{display: "none"}}
          type='file'
          onChange={handleChangeFileInput}
        />
        <div className={styles.btns}>
          <span className={styles.forget} to='#'>
            Already have an account? <Link to='/login'>Sign in</Link>
          </span>
          <button
            disabled={
              !values.username || !values.password || !values.confirmPassword || progress < 100
            }
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
