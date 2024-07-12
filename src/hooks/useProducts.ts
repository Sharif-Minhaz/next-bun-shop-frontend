import { fetcher } from "@/helpers/axios";
import { useEdgeStore } from "@/lib/edgestore";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export interface IProduct {
	id?: string;
	name: string; //
	description: string; //
	price: number;
	stock: number;
	category: string; // convert to number rename to category_name
	image: string;
}

export function useProducts() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { edgestore } = useEdgeStore();

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetcher.get("/product");
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

	const addData = async (formData: IProduct) => {
		setLoading(true);
		let res, error;
		try {
			res = await fetcher.post("/product/add", {
				...formData,
				category: Number(formData.category),
			});
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

	const updateData = async (productId: string, formData: IProduct) => {
		setLoading(true);
		let res, error;
		try {
			res = await fetcher.patch(`/product/update/${productId}`, {
				...formData,
				category: Number(formData.category),
			});
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

	const deleteData = async (id: string) => {
		setLoading(true);
		let res, error;

		try {
			res = await fetcher.delete(`/product/${id}`);
			await edgestore.publicFiles.delete({
				url: res.data?.data?.image,
			});
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

	return { data, error, loading, refetch, addData, updateData, deleteData };
}
