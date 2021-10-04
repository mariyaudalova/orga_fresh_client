import React from "react";
import Container from "@material-ui/core/Container";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.innerContainer}>
          <p>Designed by OrgaFresh Co</p>
          <p>All rights reserved &copy; 2021</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
