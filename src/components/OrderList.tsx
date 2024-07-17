import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IOrder, useOrder } from "@/hooks/useOrder";
import { toast } from "./ui/use-toast";

export default function OrderList() {
	const { data, cancelOrder, acceptOrder, refetch } = useOrder();

	const handleCancelOrder = async (id: string, productId: string) => {
		const { error } = await cancelOrder(id, productId);

		if (error) {
			return toast({
				variant: "destructive",
				title: "Order cancelled",
				description: error || "Something went wrong",
			});
		}

		refetch(); // refetching for updated data

		toast({
			title: "Order cancelation successful",
			description: "Updating information... ",
		});
	};

	const handleAcceptOrder = async (id: string) => {
		const { error } = await acceptOrder(id);

		if (error) {
			return toast({
				variant: "destructive",
				title: "Order cancelled",
				description: error || "Something went wrong",
			});
		}

		refetch(); // refetching for updated data

		toast({
			title: "Order accepted successfully",
			description: "Updating information... ",
		});
	};

	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Order Details</CardTitle>
				<CardDescription>Manage and view order information.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>User ID</TableHead>
							<TableHead>Product ID</TableHead>
							<TableHead>Count</TableHead>
							<TableHead>Ordered At</TableHead>
							<TableHead>Total Price</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Username</TableHead>
							<TableHead>Product Name</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((row: IOrder) => (
							<TableRow key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.userid}</TableCell>
								<TableCell>{row.productid}</TableCell>
								<TableCell>{row.count}</TableCell>
								<TableCell>{new Date(row.orderat).toUTCString()}</TableCell>
								<TableCell>{row.totalprice}</TableCell>
								<TableCell>
									<span
										className={`inline-block px-3 py-1 rounded-full text-sm ${
											row.status === "pending"
												? "bg-yellow-300"
												: row.status === "accepted"
												? "bg-green-500 text-white"
												: "bg-red-500 text-white"
										}`}
									>
										{row.status}
									</span>
								</TableCell>
								<TableCell>{row.username}</TableCell>
								<TableCell>{row.productname}</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button
											onClick={() => handleAcceptOrder(row.id)}
											variant="outline"
											size="sm"
										>
											Accept
										</Button>
										<Button
											onClick={() => handleCancelOrder(row.id, row.productid)}
											variant="destructive"
											size="sm"
											color="red"
										>
											Decline
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
