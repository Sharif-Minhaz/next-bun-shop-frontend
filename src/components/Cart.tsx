import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import orderInfo from "@/data/orders.json";
import CartItem from "./CartItem";

const Cart = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<ShoppingCart className="hover:text-purple-700 transition-colors" />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>All available cart items.</SheetTitle>
					<div>
						<p className="text-sm text-gray-500">
							This action cannot be undone. Wait until admin verify your request, you
							will be notified via email.
						</p>
						<div className="flex flex-col gap-3 mt-5 overflow-auto h-[calc(100vh-140px)]">
							{orderInfo.orders.map((order) => (
								<CartItem item={order} key={order._id} />
							))}
						</div>
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
export default Cart;
