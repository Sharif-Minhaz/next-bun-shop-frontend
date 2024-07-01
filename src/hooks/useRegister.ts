import { useGlobalContext } from "@/contexts/GlobalContext";
import { fetcher } from "@/helpers/axios";
import { AxiosError } from "axios";
import { useState } from "react";

interface Info {
	name: string;
	email: string;
	password: string;
}

export function useRegister() {
	const { setUser } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);

	const doRegistration = async (formData: Info) => {
		setIsLoading(true);
		let error = "";
		try {
			const res = await fetcher.post("/auth/registration", formData);
			setUser(res.data?.data);
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

	return { doRegistration, isLoading };
}
