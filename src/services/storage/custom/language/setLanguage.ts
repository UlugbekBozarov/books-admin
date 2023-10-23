import { STORAGE_NAMES } from "constants/Storage.constants";

const setLanguage = (language: string) => {
  localStorage.setItem(STORAGE_NAMES.language, language);
  sessionStorage.setItem(STORAGE_NAMES.language, language);
};

export default setLanguage;
