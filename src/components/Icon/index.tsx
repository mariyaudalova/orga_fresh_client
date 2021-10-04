import React from "react";

import * as icons from "../../theme/icons";

Icon.propTypes = {};

interface IconProps {
  type: keyof typeof import("../../theme/icons");
  color: string;
  filled?: boolean;
  width: number;
  height: number;
  onClick?: () => void;
  className: string;
}

function Icon(props: IconProps) {
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

export default Icon;
