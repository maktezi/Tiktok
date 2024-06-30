import axios from "axios";

export const getToken = async () => {
  await axios.get("/sanctum/csrf-cookie");
};

export default function getCookie(cookieName: string): string {
  const cookies = document.cookie
    .split(";")
    .reduce((cookieObj: { [key: string]: string }, currentCookie) => {
      const [cookieKey, cookieValue] = currentCookie.trim().split("=");
      cookieObj[cookieKey] = decodeURIComponent(cookieValue); // Decode cookie value
      return cookieObj;
    }, {});
  return cookies[cookieName] || "";
}
