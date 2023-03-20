import React from "react";
import {NavLink, Link} from "react-router-dom";
import styles from "./Header.module.scss";

import login from "./../../images/login.svg";


const Header = () => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.wrapper}>
          <Link className={styles.logo} to='/'>
            Movies <span>OMDb</span>
          </Link>
          <nav className={styles.menu}>
            <ul className={styles.list}>
              <li className={styles.link}>
                <NavLink to='/'>Want</NavLink>
              </li>
              <li className={styles.link}>
                <NavLink to='watched'>Watched</NavLink>
              </li>
              <li className={styles.link}>
                <NavLink to='search'>Search</NavLink>
              </li>
            </ul>
          </nav>
          <NavLink className={styles.login}>
            <img src={login} alt='login' />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
