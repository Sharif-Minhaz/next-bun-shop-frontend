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
import Head from "next/head";
import { useRouter } from "next/router";

const FormSchema = z.object({
	email: z.string().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	password: z.string().min(1, {
		message: "Password required.",
	}),
});

export default function LoginPage() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
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
			<Head>
				<title>Next Bun Shop | Login</title>
			</Head>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="sm:w-[400px] w-[320px] space-y-6 mx-auto mt-6 border shadow-md rounded-md p-4"
				>
					<div
						className="items-center gap-3 inline-flex cursor-pointer"
						onClick={() => router.push("/")}
					>
						<Image src="/brand.png" alt="" width={50} height={50} />
						<span className="text-2xl">Bun Shop</span>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="********" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<p>
						Don&apos;t have any account?{" "}
						<Link href="/auth/register" className="text-blue-400 hover:underline">
							Register now.
						</Link>
					</p>
					<Button type="submit" className="mx-auto">
						Login Now
					</Button>
				</form>
			</Form>
		</section>
	);
}
