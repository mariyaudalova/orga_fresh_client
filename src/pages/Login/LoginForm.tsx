import React from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";

import styles from "./Login.module.scss";
import { createUptateAjax } from "../../services";
import { apiUrl } from "../../env";

const LoginForm = () => {
  interface FormValues {
    loginOrEmail?: string;
    password?: string;
  }

  let requestUrl = `${apiUrl}/customers/login`;

  const onSubmit = async (values: FormValues) => {
    console.log("SDvsdv");
    const response = await createUptateAjax("post", requestUrl, values);
    const access_token = response.data.token;
    localStorage.setItem("token", access_token);
    const getCustomer = await axios.get(`${apiUrl}/customers/customer`, {
      headers: {
        Authorization: `${access_token}`,
      },
    });
    console.log(getCustomer);
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

  return (
    <Form validate={formValidation} onSubmit={onSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Field name="loginOrEmail">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  error={props.meta.error && props.meta.touched}
                  id="loginOrEmail"
                  label="Login"
                  helperText={props.meta.error}
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
                  error={props.meta.error && props.meta.touched}
                  id="password"
                  label="Password"
                  helperText={props.meta.error}
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
      )}
    </Form>
  );
};

export default LoginForm;
