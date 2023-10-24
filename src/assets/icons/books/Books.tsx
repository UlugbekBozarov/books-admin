import { memo } from "react";

const Books = () => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 13h4v1H9zm13 7h-3v3H5.75A3.754 3.754 0 0 1 2 19.25V3.5C2 2.051 3.437 1 5.417 1H22zM18 6H5.416A4.175 4.175 0 0 1 3 5.318V19.25A2.753 2.753 0 0 0 5.75 22H18zm3-4H5.416C4.04 2 3 2.645 3 3.5S4.04 5 5.417 5H19v14h2zm-6 8H7v1h8z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
};

export default memo(Books);
