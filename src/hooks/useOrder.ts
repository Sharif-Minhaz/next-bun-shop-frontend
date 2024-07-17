import { fetcher } from "@/helpers/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export interface IOrder {
	id: string;
	userid: string;
	productid: string;
	count: number;
	orderat: Date;
	totalprice: number;
	status: string;
	image: string;
	username: string;
	productname: string;
	email: string;
	price: number;
	stock: number;
	category_name: string;
}

export function useOrder() {
	const [data, setData] = useState<IOrder[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetcher.get("/order");
			setData(res.data?.data);
		} catch (err: any) {
			if (err instanceof AxiosError) {
				setError(err.response?.data?.message);
			} else {
				setError(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const getUseOrders = async () => {
		setLoading(true);
		let data, err, loading;
		loading = true;
		try {
			const res = await fetcher.get("/order/user");
			data = res.data?.data;
		} catch (err: any) {
			if (err instanceof AxiosError) {
				err = err.response?.data?.message;
			} else {
				err = err.message;
			}
		} finally {
			setLoading(false);
			loading = false;
		}

		return { data, err, loading };
	};

	const orderProduct = async (count: number, productId: string) => {
		setLoading(true);
		let res, error;

		try {
			res = await fetcher.post(`/order/add/${productId}`, { count });
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

	const cancelOrder = async (orderId: string, productId: string) => {
		setLoading(true);
		let res, error;
		try {
			res = await fetcher.patch(`/order/cancel/${orderId}/${productId}`);
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

	const acceptOrder = async (orderId: string) => {
		setLoading(true);
		let res, error;
		try {
			res = await fetcher.patch(`/order/accept/${orderId}`);
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

	return {
		data,
		error,
		loading,
		refetch,
		orderProduct,
		acceptOrder,
		cancelOrder,
		getUseOrders,
	};
}
