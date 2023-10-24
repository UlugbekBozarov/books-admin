import { memo } from "react";

const UserTick = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.4"
        d="M14.4395 19.0498L15.9595 20.5698L18.9995 17.5298"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M12.1606 10.87C12.0606 10.86 11.9406 10.86 11.8306 10.87C9.45058 10.79 7.56058 8.84 7.56058 6.44C7.55058 3.99 9.54058 2 11.9906 2C14.4406 2 16.4306 3.99 16.4306 6.44C16.4306 8.84 14.5306 10.79 12.1606 10.87Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9891 21.8102C10.1691 21.8102 8.35906 21.3502 6.97906 20.4302C4.55906 18.8102 4.55906 16.1702 6.97906 14.5602C9.72906 12.7202 14.2391 12.7202 16.9891 14.5602"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(UserTick);
