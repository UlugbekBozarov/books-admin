import { get } from "lodash";

function getItemCookie(name: string): any | undefined {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches !== null && !!get(matches, "1", undefined)
    ? JSON.parse(decodeURIComponent(matches[1]))
    : undefined;
}

export default getItemCookie;
