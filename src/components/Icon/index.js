import React from "react";
import PropTypes from "prop-types";

import * as icons from "../../theme/icons";

function Icon(props) {
  const { type, color, filled, width, height, onClick, className } = props;

  const iconJsx = icons[type];

  if (!iconJsx) {
    return null;
  }

  return (
    <span className={className} onClick={onClick}>
      {iconJsx(color, filled, width, height)}
    </span>
  );
}

Icon.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  filled: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Icon;
