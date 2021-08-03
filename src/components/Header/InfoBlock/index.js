/* eslint-disable */
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";

import styles from "./InfoBlock.module.scss";
import Icon from "../../Icon";
import DropDown from "./DropDown";

import { getCurrency } from "../../../state/currency/selectors";
import { updateCurrencyCreator } from "../../../state/currency/actionsCreators";

const InfoBlock = () => {
  const languages = ["EN", "UA"];
  const currencies = ["USD", "UAH"];

  const currentCurrencyState = useSelector(getCurrency);

  const [currentCurrency, setCurrentCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const dispatch = useDispatch();

  const changeCurrentLanguage = (currentLanguage) => {
    setCurrentLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);
  };

  const changeCurrentCurrency = (currentCurrency) => {
    setCurrentCurrency(currentCurrency);
    localStorage.setItem("currency", currentCurrency);
    dispatch(updateCurrencyCreator(currentCurrency));
  };

  const handleChange = (event) => {
    setCurrentCurrency(event.target.value);
    localStorage.setItem("currency", event.target.value);
    dispatch(updateCurrencyCreator(event.target.value));
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
            <div className={styles.verticalLine}></div>
            <Icon
              className={styles.centerContainer}
              type="currency"
              color="#FFF"
              width={20}
              height={20}
            />
            <Select
              native
              value={10}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "age-native-simple",
              }}
            >
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>

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
