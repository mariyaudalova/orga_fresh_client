import React from "react";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";

import styles from "./Home.module.scss";
import { Button } from "@material-ui/core";

const Home = () => {
  return (
    <Container className={styles.contentContainer}>
      <Grid container item xs={12}>
        <Grid className={styles.firstScreenTextContainer} item xs={6}>
          <p className={styles.greetingText}>
            We are an independent fruit & vegetable trader with over 40 years
            experience. We source the best quality produce on a daily basis,
            delivering to our loyal customers nationwide.
          </p>
          <Button variant="contained" />
        </Grid>
        <Grid className={styles.firstScreenImageContainer} item xs={6}></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
