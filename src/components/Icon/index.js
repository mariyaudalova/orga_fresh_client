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
  color: PropTypes.object,
  filled: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
