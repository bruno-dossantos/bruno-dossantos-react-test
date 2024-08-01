import { INACTIVITY_LIMIT, SECRET_KEY } from "../utils/constants";
import CryptoJS from "crypto-js";

interface SessionData {
  email: string;
  password: string;
  user: string;
}

let inactivityTimeout: NodeJS.Timeout;

const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decrypt = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const resetInactivityTimeout = () => {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(logout, INACTIVITY_LIMIT);
};

const logout = () => {
  clearSession();
  alert("Your session has expired due to inactivity.");
  window.location.href = "/login";
};

export const saveSession = (
  email: string,
  password: string,
  user: string
): void => {
  const sessionData: SessionData = { email, password, user };
  const encryptedData = encrypt(JSON.stringify(sessionData));
  localStorage.setItem("session", encryptedData);
  resetInactivityTimeout();
};

const setupInactivityListeners = () => {
  const events = ["mousemove", "keydown", "scroll", "click"];
  events.forEach((event) => {
    window.addEventListener(event, resetInactivityTimeout, false);
  });
};

export const getSession = (): SessionData | null => {
  const encryptedData = localStorage.getItem("session");
  if (encryptedData) {
    try {
      const decryptedData = decrypt(encryptedData);
      return JSON.parse(decryptedData) as SessionData;
    } catch (error) {
      console.error("Failed to decrypt or parse session data", error);
      clearSession();
    }
  }
  return null;
};

export const clearSession = () => {
  localStorage.removeItem("session");
};

export const getUserFromSession = () => {
  const sessionData = getSession();
  return sessionData ? sessionData.user : null;
};

export const saveUserToSession = (user: string) => {
  const sessionData = getSession();
  if (sessionData) {
    sessionData.user = user;
    saveSession(sessionData.email, sessionData.password, sessionData.user);
  }
};

setupInactivityListeners();
resetInactivityTimeout();
