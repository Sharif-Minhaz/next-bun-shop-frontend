import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import data from "@/data/orders.json";

export default function OrderList() {
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
							<TableHead>Paid</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Username</TableHead>
							<TableHead>Product Name</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.orders.map((row) => (
							<TableRow key={row._id}>
								<TableCell>{row._id}</TableCell>
								<TableCell>{row.userid}</TableCell>
								<TableCell>{row.productid}</TableCell>
								<TableCell>{row.count}</TableCell>
								<TableCell>{row.orderat}</TableCell>
								<TableCell>{row.totalprice}</TableCell>
								<TableCell>{row.paid}</TableCell>
								<TableCell>
									<Badge variant="secondary">{row.status}</Badge>
								</TableCell>
								<TableCell>{row.username}</TableCell>
								<TableCell>{row.productname}</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button variant="outline" size="sm">
											Accept
										</Button>
										<Button variant="destructive" size="sm" color="red">
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
