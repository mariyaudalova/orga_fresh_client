import React from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import styles from "./Login.module.scss";
import Button from "@material-ui/core/Button";
import { createUptateAjax } from "../../services";
import { apiUrl } from "../../env";

const RegistrationForm = () => {
  interface FormValues {
    loginOrEmail: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  let requestUrl = `${apiUrl}/customers/login`;

  const onSubmit = async (values: FormValues) => {
    console.log("SDvsdv");
    const response = await createUptateAjax("post", requestUrl, values);
    console.log(response);
  };

  const formValidation = (values: any) => {
    const errors = { loginOrEmail: "", password: "" };
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
          <Field name="email">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  error={props.meta.error && props.meta.touched}
                  id="email"
                  label="Email"
                  helperText={props.meta.error}
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
          <Field name="firstName">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  error={props.meta.error && props.meta.touched}
                  id="firstName"
                  label="First name"
                  helperText={props.meta.error}
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
          <Field name="lastName">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  error={props.meta.error && props.meta.touched}
                  id="lastName"
                  label="Last name"
                  helperText={props.meta.error}
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
          <div className={styles.submitButton}>
            <Button type="submit" variant="outlined" color="primary">
              Create an account
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default RegistrationForm;
