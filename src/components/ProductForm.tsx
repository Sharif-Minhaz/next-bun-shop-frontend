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
import Image from "next/image";
import Link from "next/link";
import { SelectCategory } from "./SelectCategory";
import data from "@/data/product.json";
import { Textarea } from "./ui/textarea";
import { SelectImage } from "./SelectImage";
import { useState } from "react";

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
	image: z.string().url("Image url required").min(1, {
		message: "Image is required",
	}),
});

interface FileWithPreview extends File {
	preview: string;
}

export default function ProductForm() {
	const [file, setFile] = useState<FileWithPreview | null>(null);
	const allCategories = data.buns.map((bun) => bun.category);
	const categories = new Set([...allCategories]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			stock: 0,
			category: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
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
										<Input placeholder="demo bun" {...field} />
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
										<Input type="number" placeholder="bun price" {...field} />
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
											onChange={field.onChange}
											categories={Array.from(categories)}
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
										<Textarea placeholder="bun description" {...field} />
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
										<SelectImage file={file} setFile={setFile} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type="submit" className="mx-auto">
						Add Product
					</Button>
				</form>
			</Form>
		</section>
	);
}
