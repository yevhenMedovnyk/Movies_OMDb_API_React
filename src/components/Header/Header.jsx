import React from "react";
import {useState} from "react";
import {NavLink, Link} from "react-router-dom";
import styles from "./Header.module.scss";

import login from "./../../images/login.svg";
import burger from "./../../images/burger.svg";
import burgerClose from "./../../images/burger-close.svg";

const menuLinks = [
  {to: "/", name: "Search"},
  {to: "want", name: "Want"},
  {to: "watched", name: "Watched"},
];

const Header = () => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.wrapper}>
          <Link className={styles.logo} to='/'>
            Movies <span>OMDb</span>
          </Link>
          <nav className={styles.menu}>
            <ul className={[styles.list, isBurgerOpened ? styles.opened : ""].join(" ")}>
              {menuLinks.map((link) => (
                <li key={link.name} onClick={() => setIsBurgerOpened(false)} className={styles.link}>
                  <NavLink  to={link.to}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div onClick={() => setIsBurgerOpened(!isBurgerOpened)} className={styles.burgerBtn}>
            <img src={isBurgerOpened ? burgerClose : burger} alt='burger btn' />
          </div>
          <NavLink className={styles.login}>
            <img src={login} alt='login' />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
