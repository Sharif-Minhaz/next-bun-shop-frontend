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
import { IBunData } from "./Product";

export default function UpdateProductModal({
	initialData,
	children,
}: {
	initialData: IBunData;
	children: ReactElement;
}) {
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
					<ProductForm
						initialData={{
							...initialData,
							category: initialData.category_id.toString(),
						}}
						update
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
