import React from "react";
import { Field } from "react-final-form";
import { Form } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styles from "./Login.module.scss";
import { createUptateAjax, getAjax } from "../../services";
import { apiUrl } from "../../env";
import { useDispatch } from "react-redux";
import { loginCreator } from "../../state/user/actionsCreators";

const LoginForm = () => {
  interface FormValues {
    loginOrEmail?: string;
    password?: string;
  }
  const dispatch = useDispatch();

  const getTokenUrl = `${apiUrl}/customers/login`;
  const getUserUrl = `${apiUrl}/customers/customer`;

  const onSubmit = async (values: FormValues) => {
    const tokenResponse = await createUptateAjax("post", getTokenUrl, values);

    console.log(tokenResponse);
    if (tokenResponse.data) {
      const access_token = tokenResponse.data.token;
      localStorage.setItem("token", access_token);
      const getCustomer = await getAjax(getUserUrl, {
        headers: {
          Authorization: `${access_token}`,
        },
      });
      dispatch(
        loginCreator({
          isLoading: false,
          error: "",
          data: { token: access_token, ...getCustomer.data },
        })
      );

      console.log(getCustomer);
    } else {
      console.log(tokenResponse.errors);
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
