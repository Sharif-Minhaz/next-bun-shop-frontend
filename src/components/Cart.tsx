import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import { IOrder } from "@/hooks/useOrder";

const Cart = ({ error, data }: { error: string; data: IOrder[] }) => {
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
						{error ? (
							<p className="px-2 py-1 text-red-400">Something went wrong</p>
						) : (
							<>
								{!data?.length && <p className="text-center pt-8">Cart is empty</p>}
								<div className="flex flex-col gap-3 mt-5 overflow-auto h-[calc(100vh-140px)]">
									{data?.map((order) => (
										<CartItem item={order} key={order?.id} />
									))}
								</div>
							</>
						)}
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
export default Cart;
