import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SelectCategory } from "./SelectCategory";
import { Textarea } from "./ui/textarea";
import { SelectImage } from "./SelectImage";
import { useCategories } from "@/hooks/useCategories";
import { useEdgeStore } from "@/lib/edgestore";
import { useProducts } from "@/hooks/useProducts";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
	price: z.coerce.number().gte(1, "Price must be more that 1 taka."),
	stock: z.coerce.number().gte(1, "Stock must be one or more."),
	category: z.string().min(1, {
		message: "Category is required.",
	}),
	image: z.instanceof(File).refine((file) => file && file.size > 0, "Image is required"),
});

export default function ProductForm() {
	const { edgestore } = useEdgeStore();
	const { data } = useCategories();
	const { loading, addData } = useProducts();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			stock: 0,
			category: "",
			image: undefined,
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const response = await edgestore.publicFiles.upload({
			file: data.image,
		});

		const { res, error } = await addData({ ...data, image: response?.url });

		if (error) {
			toast({ variant: "destructive", title: error, description: "Something went wrong" });
		} else if (res?.data?.success) {
			toast({
				title: "Product added successfully",
				description: "View all products in the home page",
			});

			form.reset();
		}
	}

	return (
		<section>
			<h1 className="mt-4 mb-3 text-[20px] px-5 py-3">Add New Product</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 mx-auto px-5 pb-5"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="demo bun"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bun Price</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											type="number"
											placeholder="bun price"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Available in Stock</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="bun stock amount"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-1 mt-1.5">
									<FormLabel>Product category</FormLabel>
									<FormControl>
										<SelectCategory
											value={field.value}
											disabled={loading}
											onChange={field.onChange}
											categories={data}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bun Description</FormLabel>
									<FormControl>
										<Textarea
											disabled={loading}
											placeholder="bun description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-1 mt-1">
									<FormLabel>Bun Image</FormLabel>
									<FormControl>
										<SelectImage
											onChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={loading} type="submit" className="mx-auto">
						Add Product
					</Button>
				</form>
			</Form>
		</section>
	);
}
