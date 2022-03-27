import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import LogoTop from "../../assets/logo.png";
import authContext from "../../store/Auth-context";

const MainNavigation = () => {
  const authCtx = useContext(authContext);

  const isLoggedIn = authCtx.isLogged;
  return (
    <header className={classes.header}>
      <Link to="/">
          <div>
            <img src={LogoTop} className={classes.logo_top} alt="Our logo" />
          </div>
      </Link>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && <li><NavLink activeClassName={classes.active} to="/auth">Login</NavLink></li>}
          {isLoggedIn && <li><NavLink activeClassName={classes.active} to="/profile">Profile</NavLink></li>}
          {isLoggedIn && <li><button onClick={authCtx.logout}><Link to="/">Logout</Link></button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
