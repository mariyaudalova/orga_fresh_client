/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field } from "react-final-form";

import { getCart } from "../../state/cart/selectors";
import SmallProductCard from "../../components/SmallProductCard";
import styles from "./Cart.module.scss";
import { useProductsStateByCurrency } from "../../hooks/useProductsStateByCurrency";

const BasicForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field name="firstName">
      {(props) => (
        <div className={styles.fieldContainer}>
          <TextField
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
    <Field name="delivery">
      {(props) => (
        <div className={styles.fieldContainer}>
          <TextField
            error={props.meta.error && props.meta.touched}
            id="delivery"
            label="Delivery"
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
          />
        </div>
      )}
    </Field>
    <Button
      className={styles.submitButton}
      type="submit"
      variant="outlined"
      color="primary"
    >
      Submit
    </Button>
  </form>
);

BasicForm.propTypes = {
  handleSubmit: PropTypes.func,
};

const onSubmit = (value) => {
  localStorage.setItem("order", JSON.stringify(value));
};

const formValidation = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.delivery) {
    errors.delivery = "Required";
  }
  return errors;
};

const Cart = () => {
  const [cart, setCart] = useState(useSelector(getCart));

  /**
   *  Custom hook to update products list after changing currency
   *
   *  @param cart (obj): object with fields isLoading(bool), data(object), error(string)
   *
   *  @param setCart (func): function that updates cart
   *
   */

  useProductsStateByCurrency(cart, setCart);

  const previousData = localStorage.getItem("order");
  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.data?.products?.map((item) => {
      totalPrice += item.currentPrice;
    });
    return totalPrice;
  };

  return (
    <div className={styles.contentContainer}>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Paper className={styles.formContainer}>
              <p className={styles.orderLabel2}>Billing details</p>
              <Form
                onSubmit={onSubmit}
                initialValues={JSON.parse(previousData)}
                validate={formValidation}
              >
                {(props) => <BasicForm {...props} />}
              </Form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <ul>
                {cart.data?.products?.length > 0 ? (
                  cart.data?.products?.map((item, index) => (
                    <li key={index}>
                      <div>
                        <SmallProductCard product={item} />
                      </div>
                    </li>
                  ))
                ) : (
                  <p className={styles.noProductsLabel}>
                    You don't have products in cart, add them first
                  </p>
                )}
              </ul>
              <hr />
              <div className={styles.priceContainer}>
                <p className={styles.orderLabel}>Subtotal</p>
                <p className={styles.orderValue}>{getTotalPrice()}</p>
              </div>
              <div className={styles.priceContainer}>
                <p className={styles.orderLabel}>Shipping</p>
                <p className={styles.orderValue}>Defining...</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
