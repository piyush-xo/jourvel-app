import React, { useState } from "react";
import styles from "./Home.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import Login from "../components/Login/Login";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  console.log(showLogin);
  return (
    <div className={styles.container}>
      {showLogin ? <Login /> : <div className={styles.title}>
        <div className={styles.heading}>JOURVEL</div>
        <div className={styles.subheading}>
          Uniting Memoirs and Planning for Your Adventures
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => setShowLogin(true)}>Let's Go</button>
          <FaArrowRightLong />
        </div>
      </div>}
    </div>
  );
}

export default Home;
