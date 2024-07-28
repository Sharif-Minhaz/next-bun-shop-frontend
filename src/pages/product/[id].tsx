import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Layout from "@/components/Layout";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "..";
import { toast } from "@/components/ui/use-toast";
import { useOrder } from "@/hooks/useOrder";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface IData extends IProduct {
	category_name: string;
}

const SingleProductPage: NextPageWithLayout = () => {
	const { setRefetchKey } = useGlobalContext();
	const router = useRouter();
	const { id } = router.query;
	const { fetchSingleProduct } = useProducts();
	const { orderProduct } = useOrder();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState<IData>();
	const [count, setCount] = useState(1);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		if (id) {
			fetchData(id as string);
		}
		async function fetchData(id: string) {
			setLoading(true);
			const data = await fetchSingleProduct(id as string);
			setProduct(data);
			setPrice(data?.price);
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { res, error } = await orderProduct(count, id as string);

		if (error) {
			return toast({
				variant: "destructive",
				title: "Order failed",
				description: error || "Something went wrong",
			});
		}
		// show the gateway url
		window.location.replace(res?.data.url);

		toast({
			title: "Order successful",
			description: "Waiting for admin verification. ",
		});
		setRefetchKey(Date.now()); // trigger the order data refetching
		router.push("/");
	};

	const increment = () => {
		setCount((prev) => {
			if (prev !== product?.stock) {
				setPrice((product?.price || 1) * (prev + 1));
				return prev + 1;
			}
			return prev;
		});
	};

	const decrement = () => {
		setCount((prev) => {
			if (prev > 1) {
				setPrice((product?.price || 1) * (prev - 1));
				return prev - 1;
			}
			return prev;
		});
	};

	if (loading) {
		return <div className="p-4">Loading...</div>;
	}

	if (!product) {
		return (
			<div>
				<p className="p-4 text-center">Product removed or doesn&apos;t exit.</p>
			</div>
		);
	}

	const inStock = product.stock > 0;

	return (
		<div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
			<div className="grid gap-4 md:gap-10 items-start">
				<div className="grid gap-4">
					<Image
						src={product.image}
						alt="Product Image"
						width={400}
						height={400}
						className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
					/>
				</div>
			</div>
			<div className="grid gap-4 md:gap-7">
				<div className="grid gap-2">
					<h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
					<div className="flex items-center gap-4">
						{inStock ? (
							<Badge variant="outline">In Stock: {product.stock}</Badge>
						) : (
							<Badge className="text-red-500" variant="outline">
								Sold out
							</Badge>
						)}
						<div className="text-muted-foreground">
							Category: {product.category_name}
						</div>
					</div>
				</div>
				<div className="grid gap-2">
					<h2 className="text-2xl font-bold">Description</h2>
					<div className="text-muted-foreground leading-relaxed">
						{product.description}
					</div>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Add to Cart</CardTitle>
						<CardDescription>Ready to checkout?</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="grid gap-4 md:gap-6">
							<div>
								<div className="grid gap-2">
									<Label htmlFor="quantity" className="text-base">
										Quantity
									</Label>
									<div className="flex items-center gap-2">
										<Button
											onClick={decrement}
											type="button"
											variant="outline"
											size="icon"
										>
											<MinusIcon className="h-4 w-4" />
										</Button>
										<Input
											id="quantity"
											type="number"
											onChange={(e) => setCount(Number(e.target.value))}
											value={count}
											min={1}
											max={product.stock}
											required
											className="w-16 text-center"
										/>
										<Button
											onClick={increment}
											type="button"
											variant="outline"
											size="icon"
										>
											<PlusIcon className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<div className="text-2xl font-semibold mt-3 border p-3 rounded-md shadow-sm w-fit inline-flex">
									{Number(price).toFixed(2)} BDT
								</div>
							</div>
							<Button type="submit" disabled={!inStock} size="lg">
								{inStock ? "Pay Now" : "Not available right now"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

function MinusIcon(props: { className: string }) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14" />
		</svg>
	);
}

function PlusIcon(props: { className: string }) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default SingleProductPage;
