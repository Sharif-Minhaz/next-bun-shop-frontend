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
import { useLogin } from "@/hooks/useLogin";

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
	const { doLogin, isLoading } = useLogin();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(formData: z.infer<typeof FormSchema>) {
		const { data, error } = await doLogin(formData);

		if (data?.success && !error) {
			toast({
				title: "Login successful",
				description: "You can have access to the all features",
			});
			router.push("/");
		} else if (error) {
			toast({
				variant: "destructive",
				title: "Login failed",
				description: error || "Something went wrong",
			});
		} else {
			toast({
				variant: "destructive",
				title: "Registration failed",
				description: data?.message || "Something went wrong",
			});
		}
	}

	return (
		<section className="h-screen grid place-content-center">
			<Head>
				<title>Next Bun Shop | Login</title>
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
									<Input type="password" placeholder="********" {...field} />
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
					<Button disabled={isLoading} type="submit" className="mx-auto">
						Login Now
					</Button>
				</form>
			</Form>
		</section>
	);
}
