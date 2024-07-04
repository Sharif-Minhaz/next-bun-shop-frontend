import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement, use } from "react";
import { Button } from "./ui/button";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/router";

export default function DeleteConfirmation({
	productId,
	children,
}: {
	productId: string;
	children: ReactElement;
}) {
	const { deleteData } = useProducts();
	const router = useRouter();
	const handleDelete = async () => {
		const { res, error } = await deleteData(productId);

		if (error) {
			toast({ variant: "destructive", title: error, description: "Something went wrong" });
		} else if (res?.data?.success) {
			toast({
				title: "Product deleted successfully",
				description: "View all products in the home page",
			});
			router.replace(router.asPath);
		}
	};

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and
						remove your data from our servers.
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="destructive" onClick={handleDelete}>
								Confirm
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
