const setItemCookie = (name: string, value: any, options: any = {}) => {
  options = {
    path: "/",
    ...options,
  };

  if (options?.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(JSON.stringify(value));

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  if (value !== undefined && value !== null) {
    document.cookie = updatedCookie;
  } else {
    console.error(
      `${name} - The information specified by the name was not stored in the cookie file. This is because the data may be 'undefined' or 'null'`
    );
  }
};

export default setItemCookie;
