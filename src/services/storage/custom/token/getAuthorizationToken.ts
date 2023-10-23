import { STORAGE_NAMES } from "constants/Storage.constants";

import getItemCookie from "../../cookies/getItemCookie";

const getAuthorizationToken = () => {
  return getItemCookie(STORAGE_NAMES.authorization);
};

export default getAuthorizationToken;
