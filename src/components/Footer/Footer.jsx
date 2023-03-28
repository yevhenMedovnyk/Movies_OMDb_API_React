import {combineReducers} from "@reduxjs/toolkit";
import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.title}>&copy; 2023 created by Yevhen Medovnyk</div>
      </div>
    </footer>
  );
};

export default Footer;
