import { useState } from "react";

const setCookie = (name, value, maxAge) => {
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/`;
};

const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
};

const useCookiesStorage = (cookieName) => {
  const getCookieValue = () => {
    const cookie = getCookie(cookieName);
    if (cookie) {
      return JSON.parse(decodeURIComponent(cookie));
    }
    return null;
  };

  const [cookieValue, setCookieValue] = useState(getCookieValue);

  const updateCookie = (value, maxAge) => {
    setCookie(cookieName, encodeURIComponent(JSON.stringify(value)), maxAge);
    setCookieValue(value);
  };

  return [cookieValue, updateCookie];
};

export default useCookiesStorage;
