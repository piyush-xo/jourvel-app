import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.container}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/feed">Feed</Link>
    </nav>
  );
}

export default Nav;
