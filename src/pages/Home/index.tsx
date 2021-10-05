import React from "react";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button, Hidden } from "@material-ui/core";

import { PRODUCTS_ROUTE } from "../../utils/consts";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Container className={styles.contentContainer}>
      <Grid container item xs={12}>
        <Grid className={styles.firstScreenTextContainer} item xs={12} md={6}>
          <p className={styles.greetingText}>
            We are an independent fruit & vegetable trader with over 40 years
            experience. We source the best quality produce on a daily basis,
            delivering to our loyal customers nationwide.
          </p>
          <NavLink to={`${PRODUCTS_ROUTE}`}>
            <Button className={styles.shopButton} variant="contained">
              Shop now
            </Button>
          </NavLink>
        </Grid>
        <Hidden xsDown>
          <Grid className={styles.firstScreenImageContainer} item md={6}></Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Home;
