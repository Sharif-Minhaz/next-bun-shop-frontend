import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface IItem {
	_id: string;
	userid: string;
	productid: string;
	count: number;
	orderat: string;
	totalprice: number;
	status: string;
	username: string;
	productname: string;
	image: string;
}

export default function CartItem({ item }: { item: IItem }) {
	return (
		<Card className="flex items-center gap-4 p-4 rounded-lg shadow-lg bg-background">
			<Image
				src={item.image}
				alt="Product Image"
				width={100}
				height={100}
				className="rounded-md object-cover"
			/>
			<div className="flex-1 grid gap-1">
				<h3 className="text-lg font-medium">{item.productname}</h3>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>Quantity: {item.count}</span>
					<Separator orientation="vertical" />
					<span>Total: ৳{item.totalprice}</span>
				</div>
				<div className="flex items-center gap-2 text-sm mt-2">
					<Badge variant="outline" className="bg-green-100 text-green-600">
						{item.status}
					</Badge>
				</div>
			</div>
		</Card>
	);
}
