import { STORAGE_NAMES } from "constants/Storage.constants";
import setItemCookie from "../../cookies/setItemCookie";

const setAuthorizationToken = (token: string) => {
  return setItemCookie(STORAGE_NAMES.authorization, token);
};

export default setAuthorizationToken;
