import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import UpdateProductModal from "./UpdateProductModal";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface IBunData {
	_id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	image: string;
}

export default function Product({ data }: { data: IBunData }) {
	const { isAdmin } = useGlobalContext();

	return (
		<Card className="w-full relative mx-auto max-w-md overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
			<Image
				src={data.image}
				alt={data.name}
				width={500}
				height={400}
				className="w-full h-64 object-cover"
			/>

			{isAdmin() && (
				<div className="absolute top-2 right-2 bg-slate-100 rounded-xl p-2 flex flex-col gap-2">
					<span className="cursor-pointer" onClick={() => alert("Delete card")}>
						<Trash2 className="text-red-500" size={18} />
					</span>
					<span className="cursor-pointer">
						<UpdateProductModal>
							<Edit className="text-purple-500" size={18} />
						</UpdateProductModal>
					</span>
				</div>
			)}

			<div className="p-6 bg-background">
				<div className="flex items-start justify-between">
					<div className="grid gap-2">
						<h3 className="text-xl font-bold">{data.name}</h3>
						<p className="text-muted-foreground">{data.description}</p>
					</div>
					<div className="text-2xl font-bold whitespace-nowrap">
						<span className="pr-1">৳</span>
						{data.price}
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CuboidIcon className="w-4 h-4" />
						<span>In Stock</span>
					</div>
					<Link href={`/product/${data._id}`}>
						<Button size="sm">Add to Cart</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}

function CuboidIcon(props: { className: string }) {
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
			<path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z" />
			<path d="M10 22v-8L2.25 9.15" />
			<path d="m10 14 11.77-6.87" />
		</svg>
	);
}
