import { useGlobalContext } from "@/contexts/GlobalContext";
import { fetcher } from "@/helpers/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export function useLogout() {
	const router = useRouter();
	const { setUser } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);

	const doLogout = async () => {
		setIsLoading(true);
		let error = "",
			res;
		try {
			res = await fetcher.post("/auth/logout");
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
