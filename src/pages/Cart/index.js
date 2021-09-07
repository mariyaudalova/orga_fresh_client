/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field } from "react-final-form";
import { useHistory } from "react-router-dom";

import { getCart } from "../../state/cart/selectors";
import SmallProductCard from "../../components/SmallProductCard";
import styles from "./Cart.module.scss";
import { useProductsStateByCurrency } from "../../hooks/useProductsStateByCurrency";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../../utils/consts";

import {
  clearCartCreator,
  removeFromCartCreator,
} from "../../state/cart/actionsCreators";

const BasicForm = (props) => {
  const { touched, errors } = props;
  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Field name="firstName">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  id="firstName"
                  label="First name"
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
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
                  fullWidth
                  error={props.meta.error && props.meta.touched}
                  helperText={touched.delivery && errors.delivery}
                  id="delivery"
                  label="Delivery"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
          <Field name="phone">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  id="phone"
                  label="Phone"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="lastName">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last name"
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
          <Field name="type">
            {(props) => (
              <div className={styles.fieldContainer}>
                <TextField
                  error={props.meta.error && props.meta.touched}
                  helperText={touched.type && errors.type}
                  id="type"
                  fullWidth
                  label="Delivery type"
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
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  id="email"
                  label="Email"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </div>
            )}
          </Field>
        </Grid>
      </Grid>
      <div className={styles.submitButtonContainer}>
        <Button
          className={styles.submitButton}
          type="submit"
          variant="outlined"
          color="primary"
        >
          Submit order
        </Button>
      </div>
    </form>
  );
};

BasicForm.propTypes = {
  handleSubmit: PropTypes.func,
};

const formValidation = (values) => {
  console.log(values);
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
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.type) {
    errors.type = "Required";
  }
  return errors;
};

const Cart = () => {
  const [cart, setCart] = useState(useSelector(getCart));

  const currectCartState = useSelector(getCart);

  useEffect(() => {
    setCart(currectCartState);
  }, [currectCartState]);

  console.log("useSelector(getCart)", useSelector(getCart));

  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = (value) => {
    localStorage.setItem("order", JSON.stringify(value));
    setDialogOpen(true);
  };

  const history = useHistory();

  const dispatch = useDispatch();

  const handleClose = () => {
    localStorage.setItem("cart", null);

    dispatch(clearCartCreator());

    history.push(`${PRODUCTS_ROUTE}`);
  };

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
      totalPrice += Number(item.currentPrice);
    });
    return totalPrice;
  };

  const deleteFromCart = (id) => {
    dispatch(removeFromCartCreator(id));
    console.log(id);
  };

  return (
    <div className={styles.contentContainer}>
      <Container>
        {cart.data?.products?.length > 0 ? (
          <>
            <p className={styles.pageTitle}>Complete your order:</p>
            <Grid container spacing={3}>
              <Grid className={styles.formContainer} item xs={12} sm={6}>
                <Paper className={styles.billingDetailsContainer}>
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
              <Grid item xs={12} sm={6}>
                <Paper>
                  <ul className={styles.productsListContainer}>
                    {cart.data?.products?.length > 0 ? (
                      cart.data?.products?.map((item, index) => (
                        <li key={index}>
                          <div>
                            <SmallProductCard
                              product={item}
                              deleteFromCart={() => deleteFromCart(item._id)}
                            />
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
          </>
        ) : (
          <p className={styles.noProductsWarning}>
            You have no products in cart.{" "}
            <Link to={`${PRODUCTS_ROUTE}`}>
              <span className={styles.link}>Go back to Products list</span>
            </Link>
          </p>
        )}
      </Container>
      <Modal
        isOpen={isDialogOpen}
        title="Title"
        content="Content"
        buttonName="Close"
        handleClose={handleClose}
      />
    </div>
  );
};

export default Cart;
