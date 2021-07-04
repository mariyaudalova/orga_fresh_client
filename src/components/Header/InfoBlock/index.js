import React, { useState } from "react";
import styles from "./InfoBlock.module.scss";
import Icon from "../../Icon";
import DropDown from "./DropDown";
import Container from "../../Container";

const InfoBlock = () => {
  //мб что-то с memo

  const languages = ["EN", "UA"];
  const currencies = ["USD", "UAH"];

  const [currentCurrency, setCurrentCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const changeCurrentLanguage = (currentLanguage) => {
    setCurrentLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);
  };

  const changeCurrentCurrency = (currentCurrency) => {
    setCurrentCurrency(currentCurrency);
    localStorage.setItem("currency", currentCurrency);
  };

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.innerContainer}>
          <div className={styles.flexRow}>
            <Icon
              type="phone"
              color="#FFF"
              className={styles.centerContainer}
              width={20}
              height={20}
            />
            <a className={styles.contentAfterIcon} href="tel:+380639384539">
              (+380) 639 384 539
            </a>
            <div className={styles.verticalLine}></div>
            <Icon
              type="email"
              color="#FFF"
              className={styles.centerContainer}
              width={20}
              height={20}
            />
            <a
              className={styles.contentAfterIcon}
              href="mailto:OrganicFood@gmail.com?subject=Question"
            >
              OrganicFood@gmail.com
            </a>
          </div>
          <div className={styles.flexRow}>
            <Icon
              type="language"
              color="#FFF"
              className={styles.centerContainer}
              width={20}
              height={20}
            />
            <DropDown
              currentValue={currentLanguage}
              listOfOptions={languages}
              onClick={changeCurrentLanguage}
            />
            <div className={styles.verticalLine}></div>
            <Icon
              className={styles.centerContainer}
              type="currency"
              color="#FFF"
              width={20}
              height={20}
            />
            <DropDown
              currentValue={currentCurrency}
              listOfOptions={currencies}
              onClick={changeCurrentCurrency}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InfoBlock;
