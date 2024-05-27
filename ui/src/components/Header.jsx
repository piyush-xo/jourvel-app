import React from "react";
import styles from "./Header.module.css";
import DropdownMenu from "./DropdownMenu";

function Header(props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.heading}>{props.heading}</h2>
      <DropdownMenu logoutHandler = {props.logoutHandler}/>
    </div>
  );
}

export default Header;
