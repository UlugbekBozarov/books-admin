import { FC, memo } from "react";
import { IconProps } from "types";

const Edit: FC<IconProps> = ({ width = 16, height = "16", color = "#fff" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M5.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11H7.5C10 11 11 10 11 7.5V6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.01994 1.50988L4.07994 5.44988C3.92994 5.59988 3.77994 5.89488 3.74994 6.10988L3.53494 7.61488C3.45494 8.15988 3.83994 8.53988 4.38494 8.46488L5.88994 8.24988C6.09994 8.21988 6.39494 8.06988 6.54994 7.91988L10.4899 3.97988C11.1699 3.29988 11.4899 2.50988 10.4899 1.50988C9.48994 0.509882 8.69994 0.829882 8.01994 1.50988Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M7.45496 2.07495C7.78996 3.26995 8.72496 4.20495 9.92496 4.54495"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Edit);
