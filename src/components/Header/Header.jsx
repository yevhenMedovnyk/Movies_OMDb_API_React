import React from "react";
import {useState} from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useSelector} from "react-redux";
import styles from "./Header.module.scss";

import burger from "./../../images/burger.svg";
import login from "./../../images/login.svg";
import burgerClose from "./../../images/burger-close.svg";
import Logout from "../Logout/Logout";

const menuLinks = [
  {to: "/", name: "Search"},
  {to: "want", name: "Want"},
  {to: "watched", name: "Watched"},
];

const Header = () => {
  const {avatarUrl} = useSelector((state) => state.user);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const navigate = useNavigate();
	const { isAuth } = useAuth();
	

  const onClickLoginBtn = () => {
    if (!isAuth) {
      navigate("/login");
    }
    return;
  };

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
                <li
                  key={link.name}
                  onClick={() => setIsBurgerOpened(false)}
                  className={styles.link}
                >
                  <NavLink to={link.to}>{link.name}</NavLink>
                </li>
              ))}
              {isAuth && <Logout />}
            </ul>
          </nav>
          <div onClick={() => setIsBurgerOpened(!isBurgerOpened)} className={styles.burgerBtn}>
            <img src={isBurgerOpened ? burgerClose : burger} alt='burger btn' />
          </div>
          <img
            onClick={onClickLoginBtn}
            className={[styles.login, isAuth ? styles.isAuth : ""].join(" ")}
            src={isAuth ? avatarUrl : login}
            alt='login'
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
