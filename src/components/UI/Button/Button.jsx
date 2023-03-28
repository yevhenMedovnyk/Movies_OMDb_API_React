import React from "react";
import styles from "./Button.module.scss";

const Button = ({text, id, onClick, categoryId}) => {
  return (
    <>
      <button onClick={()=> onClick(id, text)} className={[styles.btn, categoryId === id ? styles.active : ''].join(" ")}>{text}</button>
    </>
  );
};

export default Button;
