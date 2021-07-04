import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ title, onClick, disabled, type, className }) => {
  return (
    <>
      <button
        data-testid="button"
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  inSlider: PropTypes.bool,
};

Button.defaultProps = {
  variant: "",
  disabled: false,
  type: "button",
  onClick: (e) => {
    return e;
  },
  className: "",
  inSlider: false,
};

export default Button;
