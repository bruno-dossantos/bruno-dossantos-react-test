import React from "react";

import bg from "../../assets/images/bg-login.jpg";

import styles from "./Login.module.scss";

function LoginImage() {
  return (
    <div className={styles.imageContainer}>
      <img
        src={bg}
        alt="Background"
        className={styles.imageLogin}
        draggable="false"
      />
      <h1 className={styles.overlayText}>Welcome Back!</h1>
    </div>
  );
}

export default LoginImage;
