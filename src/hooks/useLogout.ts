import { useGlobalContext } from "@/contexts/GlobalContext";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
export function useLogout() {
	const router = useRouter();
	const { setUser } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);

	const doLogout = async () => {
		setIsLoading(true);
		let error = "";
		try {
			Cookies.remove("auth"); // remove the auth cookie from the browser
			setUser(undefined);
			router.push("/");
		} catch (err: any) {
			if (err instanceof AxiosError) {
				error = err.response?.data?.message;
			} else {
				error = err.message;
			}
		} finally {
			setIsLoading(false);
		}

		return { error };
	};

	return { doLogout, isLoading };
}
