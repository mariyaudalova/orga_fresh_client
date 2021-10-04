import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

import styles from "./Login.module.scss";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeLoginState = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.formContainerWrapper}>
        <Paper className={styles.formContainer}>
          {isLogin && (
            <>
              <p className={styles.pageTitle}>Sign in to continue shopping</p>
              <LoginForm />
              <Button onClick={changeLoginState} variant="text">
                Don't have an account? Create one
              </Button>
            </>
          )}
          {!isLogin && (
            <>
              <p className={styles.pageTitle}>Sign up to make first order</p>
              <RegistrationForm changeLoginState={changeLoginState} />
              <Button onClick={changeLoginState} variant="text">
                Already have an account? Login
              </Button>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};
export default Login;
