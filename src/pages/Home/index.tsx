import React from "react";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.contentContainer}>
      <Container>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            sdv
          </Grid>
          <Grid className={styles.firstScreenContainer} item xs={6}>
            sdv
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
