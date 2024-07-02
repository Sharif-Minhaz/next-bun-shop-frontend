import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
import { useRegister } from "@/hooks/useRegister";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().min(3, {
		message: "Email must be at least 3 characters.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

export default function RegisterPage() {
	const router = useRouter();
	const { doRegistration, isLoading } = useRegister();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const { error } = await doRegistration(data);

		if (error) {
			return toast({
				variant: "destructive",
				title: "Registration failed",
				description: error || "Something went wrong",
			});
		}

		toast({
			title: "Registration successful",
			description: "You can have access to the all features",
		});
		router.push("/");
	}

	return (
		<section className="h-screen grid place-content-center">
			<Head>
				<title>Next Bun Shop | Register</title>
			</Head>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="sm:w-[400px] w-[320px] space-y-6 mx-auto border shadow-md rounded-md p-4"
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
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="john doe" {...field} />
								</FormControl>
								<FormDescription>This is your public display name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john@gmail.com" {...field} />
								</FormControl>
								<FormDescription>This is your public email.</FormDescription>
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
									<Input type="password" placeholder="********" {...field} />
								</FormControl>
								<FormDescription>Provide easy and strong password</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<p>
						Already have an account?{" "}
						<Link href="/auth/login" className="text-blue-400 hover:underline">
							Login now.
						</Link>
					</p>
					<Button disabled={isLoading} type="submit" className="mx-auto">
						Registration
					</Button>
				</form>
			</Form>
		</section>
	);
}
