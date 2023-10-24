import { STORAGE_NAMES } from "constants/Storage.constants";

const getLanguage = () => {
  return localStorage.getItem(STORAGE_NAMES.language) || "uz";
};

export default getLanguage;
