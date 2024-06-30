import Image from "next/image";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Search } from "lucide-react";

const formSchema = z.object({
	search: z.string().min(1, {
		message: "Search must be at least 1 characters.",
	}),
});

export default function Navbar() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: "",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
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
		<nav className="flex justify-between px-5 py-3 bg-purple-100 fixed top-0 w-full">
			<div className="flex gap-3 items-center">
				<Image src="/brand.png" alt="bun-shop" height={40} width={40} />
				<Link href="/" className="font-semibold text-2xl">
					Bun Shop
				</Link>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex ml-4">
						<FormField
							control={form.control}
							name="search"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="search"
											placeholder="Search any type of bun"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type="submit">
							<Search />
						</Button>
					</form>
				</Form>
			</div>
			<div className="flex items-center">
				<Link className="font-semibold" href="/auth/login">
					Login
				</Link>
			</div>
		</nav>
	);
}
