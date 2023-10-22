import { getItemCookie } from "services/storage";
import { STORAGE_NAMES } from "constants/Storage.constants";

import { PrivateRouts, PublicRouts } from "./components";

const Routes = () => {
  if (!getItemCookie(STORAGE_NAMES.authorization)) {
    return <PrivateRouts />;
  } else {
    return <PublicRouts />;
  }
};

export default Routes;
