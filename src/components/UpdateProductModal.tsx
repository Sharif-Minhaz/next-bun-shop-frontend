import { ReactElement } from "react";
import ProductForm from "./ProductForm";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

export default function UpdateProductModal({ children }: { children: ReactElement }) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-40px)] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit product</DialogTitle>
					<DialogDescription>
						Make changes to your product here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div className="-mt-4">
					<ProductForm update />
				</div>
			</DialogContent>
		</Dialog>
	);
}
