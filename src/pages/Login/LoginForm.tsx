import React from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./Login.module.scss";
import { createUptateAjax } from "../../services";
import { apiUrl } from "../../env";
import { PRODUCTS_ROUTE } from "../../utils/consts";
import { getAuthorizedUser } from "../../common/helpers/getAuthorizedUser";
import { useState } from "react";
import { useEffect } from "react";

const LoginForm = () => {
  interface FormValues {
    loginOrEmail?: string;
    password?: string;
  }
  const dispatch = useDispatch();
  const history = useHistory();

  const [responseError, setResponseError] = useState("");

  useEffect(() => {}, []);

  const getTokenUrl = `${apiUrl}/customers/login`;

  const onSubmit = async (values: FormValues) => {
    const tokenResponse = await createUptateAjax("post", getTokenUrl, values);

    console.log(tokenResponse);
    if (tokenResponse.data) {
      const access_token = tokenResponse.data.token;
      localStorage.setItem("token", access_token);

      await getAuthorizedUser(access_token, dispatch);
      history.push(`${PRODUCTS_ROUTE}`);

      //console.log(getCustomer);
    } else {
      setResponseError(tokenResponse.errors);
      // console.log(tokenResponse.errors);
    }
  };

  const formValidation = (values: FormValues) => {
    const errors: FormValues = {};
    if (!values.loginOrEmail) {
      errors.loginOrEmail = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const clickTextFieldHendler = () => {
    setResponseError("");
  };

  return (
    <Form validate={formValidation} onSubmit={onSubmit}>
      {(props) => {
        return (
          <>
            <p>{responseError}</p>
            <form onSubmit={props.handleSubmit}>
              <Field name="loginOrEmail">
                {(props) => (
                  <div className={styles.fieldContainer}>
                    <TextField
                      onClick={clickTextFieldHendler}
                      fullWidth
                      error={props.meta.error && props.meta.touched}
                      helperText={props.meta.touched && props.meta.error}
                      id="loginOrEmail"
                      label="Login"
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  </div>
                )}
              </Field>
              <Field name="password">
                {(props) => (
                  <div className={styles.fieldContainer}>
                    <TextField
                      fullWidth
                      onClick={clickTextFieldHendler}
                      error={props.meta.error && props.meta.touched}
                      id="password"
                      label="Password"
                      helperText={props.meta.touched && props.meta.error}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  </div>
                )}
              </Field>
              <div>
                <Button
                  className={styles.submitButton}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </form>
          </>
        );
      }}
    </Form>
  );
};

export default LoginForm;
