import { FC, memo } from "react";

import { IconProps } from "types";

const ArrowDown: FC<IconProps> = ({
  width = "24",
  height = "24",
  color = "#FF4D4F",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0701 14.4299L12.0001 20.4999L5.93005 14.4299"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.5V20.33"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(ArrowDown);
