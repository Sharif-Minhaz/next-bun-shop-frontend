import { useGlobalContext } from "@/contexts/GlobalContext";
import { fetcher } from "@/helpers/axios";
import { setEncryptedCookie } from "@/lib/cookieStore";
import { AxiosError } from "axios";
import { useState } from "react";

interface Info {
	email: string;
	password: string;
}

export function useLogin() {
	const { setUser, setRefetchKey } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);

	const doLogin = async (formData: Info) => {
		setIsLoading(true);
		let error = "",
			res;
		try {
			res = await fetcher.post("/auth/login", formData);
			setUser(res.data?.data);
			// set the auth cookie in the browser for 1 day
			setRefetchKey(Date.now());
			setEncryptedCookie("auth", res.data?.token, 1);
		} catch (err: any) {
			if (err instanceof AxiosError) {
				error = err.response?.data?.message;
			} else {
				error = err.message;
			}
		} finally {
			setIsLoading(false);
		}

		return { data: res?.data, error };
	};

	return { doLogin, isLoading };
}
