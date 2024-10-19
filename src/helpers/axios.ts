import axios from "axios";
import { getDecryptedCookie } from "@/lib/cookieStore";

const token = getDecryptedCookie("auth");

export const fetcher = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	// baseURL: "https://next-bun-shop-backend.onrender.com/api/v1",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
