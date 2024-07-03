import { useGlobalContext } from "@/contexts/GlobalContext";
import { fetcher } from "@/helpers/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useCategories() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetcher.get("/category");
			setData(res.data?.data);
		} catch (err: any) {
			if (err instanceof AxiosError) {
				setError(err.response?.data?.message);
			} else {
				setData(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const addData = async (name: string) => {
		setLoading(true);
		let res, error;
		try {
			res = await fetcher.post("/category/add", { category_name: name });
		} catch (err: any) {
			if (err instanceof AxiosError) {
				setError(err.response?.data?.message);
				error = err.response?.data?.message;
			} else {
				setData(err.message);
			}
		} finally {
			setLoading(false);
		}

		return { res, error };
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();

	return { data, error, loading, refetch, addData };
}
