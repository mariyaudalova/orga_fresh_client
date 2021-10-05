import React from "react";

import InfoBlock from "./InfoBlock";
import NavBar from "./NavBar";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <InfoBlock />
      <NavBar />
    </div>
  );
};

export default Header;
