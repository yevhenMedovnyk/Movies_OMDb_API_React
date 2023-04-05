import React, {useState} from "react";
import styles from "./FormInput.module.scss";

const FormInput = (props) => {
  const {placeholder, errorMessage, type, value, onChange, name, pattern} = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={styles.wrapper}>
      <input
        value={value}
        onChange={onChange}
        onBlur={handleFocus}
        focused={isFocused.toString()}
        placeholder={placeholder}
        type={type}
        className={styles.input}
        name={name}
        pattern={pattern}
        onFocus={() => name === "password" && setIsFocused(true)}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
