import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { updateCurrencyCreator } from "../../../state/currency/actionsCreators";
import { getUser } from "../../../state/user/selectors";
import { LOGIN_ROUTE } from "../../../utils/consts";
import Icon from "../../Icon";
import DropDown from "./DropDown";

import styles from "./InfoBlock.module.scss";

const InfoBlock = () => {
  const currencies = ["USD", "UAH"];

  const [token, setToken] = useState(localStorage.getItem("token"));

  const user = useSelector(getUser);

  useEffect(() => {
    user.data?.token && setToken(user.data?.token);
  }, [user]);

  const [currentCurrency, setCurrentCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  const dispatch = useDispatch();

  const changeCurrentCurrency = (currentCurrency: string) => {
    setCurrentCurrency(currentCurrency);
    localStorage.setItem("currency", currentCurrency);
    dispatch(updateCurrencyCreator(currentCurrency));
  };

  const logout = () => {
    localStorage.setItem("token", "");
    setToken("");
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
              className={styles.centerContainer}
              type="currency"
              color="#FFF"
              width={20}
              height={20}
            />
            <DropDown
              currentValue={currentCurrency}
              listOfOptions={currencies.filter(
                (item) => item !== currentCurrency
              )}
              onClick={changeCurrentCurrency}
            />
            <div className={styles.verticalLine}></div>

            {!token ? (
              <Link to={`${LOGIN_ROUTE}`}>Login or register</Link>
            ) : (
              <p onClick={logout}>Logout</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InfoBlock;
