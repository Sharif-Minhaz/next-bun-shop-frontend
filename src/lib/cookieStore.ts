import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const setEncryptedCookie = (name: string, value: string, days: number) => {
	const cookieKey = process.env.NEXT_PUBLIC_COOKIE_KEY;
	if (!cookieKey) {
		throw new Error("NEXT_PUBLIC_COOKIE_KEY is not set");
	}

	const encryptedValue = CryptoJS.AES.encrypt(value, cookieKey).toString();
	Cookies.set(name, encryptedValue, { expires: days });
};

const getDecryptedCookie = (name: string) => {
	const encryptedValue = Cookies.get(name);
	if (!encryptedValue) return null;

	const cookieKey = process.env.NEXT_PUBLIC_COOKIE_KEY;
	if (!cookieKey) {
		throw new Error("NEXT_PUBLIC_COOKIE_KEY is not set");
	}

	const bytes = CryptoJS.AES.decrypt(encryptedValue, cookieKey);
	const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
	return decryptedValue;
};

const decryptCookie = (encryptedValue: string | undefined) => {
	if (!encryptedValue) return null;

	const cookieKey = process.env.NEXT_PUBLIC_COOKIE_KEY;
	if (!cookieKey) {
		throw new Error("NEXT_PUBLIC_COOKIE_KEY is not set");
	}

	const bytes = CryptoJS.AES.decrypt(encryptedValue, cookieKey);
	const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
	return decryptedValue;
};

export { setEncryptedCookie, getDecryptedCookie, decryptCookie };
