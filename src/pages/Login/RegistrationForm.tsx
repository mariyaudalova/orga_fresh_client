import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { createUptateAjax } from "../../services";
import { apiUrl } from "../../env";
import Modal from "../../components/Modal";

import styles from "./Login.module.scss";

const RegistrationForm = (props: { changeLoginState: () => void }) => {
  interface RegistrationFormValues {
    login?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }

  const requestUrl = `${apiUrl}/customers`;
  const { changeLoginState } = props;
  const [registerModal, setRegisterModal] = useState(false);

  const onSubmit = async (values: RegistrationFormValues) => {
    console.log(values);
    const response = await createUptateAjax("post", requestUrl, values);
    if (response.data) {
      setRegisterModal(true);
    } else {
      return response.errors;
    }
  };

  const formValidation = (values: any) => {
    const errors: RegistrationFormValues = {};
    if (!values.login) {
      errors.login = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    return errors;
  };

  const handleCloseRegisterModal = () => {
    changeLoginState();
  };

  return (
    <>
      <Form validate={formValidation} onSubmit={onSubmit}>
        {(props) => (
          <>
            <form onSubmit={props.handleSubmit}>
              <Field name="login">
                {(props) => (
                  <div className={styles.fieldContainer}>
                    <TextField
                      fullWidth
                      error={props.meta.error && props.meta.touched}
                      helperText={
                        props.meta.touched &&
                        (props.meta.error || props.meta.submitError)
                      }
                      id="login"
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
                      error={props.meta.error && props.meta.touched}
                      id="password"
                      label="Password"
                      helperText={
                        props.meta.touched &&
                        (props.meta.error || props.meta.submitError)
                      }
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
                      helperText={
                        props.meta.touched &&
                        (props.meta.error || props.meta.submitError)
                      }
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
                      helperText={
                        props.meta.touched &&
                        (props.meta.error || props.meta.submitError)
                      }
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
                      helperText={
                        props.meta.touched &&
                        (props.meta.error || props.meta.submitError)
                      }
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
          </>
        )}
      </Form>
      <Modal
        isOpen={registerModal}
        title="Registration was successfully completed"
        content="Login for future purchases!"
        buttonName="Close"
        handleClose={handleCloseRegisterModal}
      />
    </>
  );
};

export default RegistrationForm;
