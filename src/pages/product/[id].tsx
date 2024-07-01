import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import products from "@/data/product.json";

const SingleProductPage: NextPageWithLayout = () => {
	const router = useRouter();
	const product = products.buns.find((data) => data._id === router.query?.id);

	if (!product)
		return (
			<div>
				<p className="p-4 text-center">Product removed or doesn&apos;t exit.</p>
			</div>
		);

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
						<Badge variant="outline">In Stock</Badge>
						<div className="text-muted-foreground">Category: {product.category}</div>
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
						<form className="grid gap-4 md:gap-6">
							<div>
								<div className="grid gap-2">
									<Label htmlFor="quantity" className="text-base">
										Quantity
									</Label>
									<div className="flex items-center gap-2">
										<Button type="button" variant="outline" size="icon">
											<MinusIcon className="h-4 w-4" />
										</Button>
										<Input
											id="quantity"
											type="number"
											defaultValue={1}
											className="w-16 text-center"
										/>
										<Button type="button" variant="outline" size="icon">
											<PlusIcon className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<div className="text-2xl font-semibold mt-3 border p-3 rounded-md shadow-sm w-fit inline-flex">
									{product.price} BDT
								</div>
							</div>
							<Button size="lg">Pay Now</Button>
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
