import { FC, memo } from "react";
import { IconProps } from "types";

const ArrowUp: FC<IconProps> = ({
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
        d="M18.0699 9.57L11.9999 3.5L5.92993 9.57"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20.4999V3.66992"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(ArrowUp);
