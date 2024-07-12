import Image from "next/image";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, UserCog } from "lucide-react";
import Cart from "./Cart";
import ProfileButton from "./ProfileButton";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/router";

const formSchema = z.object({
	search: z.string(),
});

export default function Navbar() {
	const router = useRouter();
	const { query } = router;
	const { user, isAdmin } = useGlobalContext();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: "",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		const updatedQuery = {
			...query,
			page: 1,
			q: data.search,
		};
		router.push({
			pathname: router.pathname,
			query: updatedQuery,
		});
		// form.reset();
	}

	return (
		<nav className="flex justify-between px-5 py-3 z-30 bg-purple-100 fixed top-0 w-full">
			<div className="flex gap-3 items-center">
				<Image src="/brand.png" alt="bun-shop" height={40} width={40} />
				<Link href="/" className="font-semibold text-2xl md:inline-flex hidden">
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
										<Input placeholder="Search any type of bun" {...field} />
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
			<div className="flex items-center gap-4">
				{user ? (
					<>
						{isAdmin() && (
							<Link href="/dashboard">
								<UserCog className="hover:text-purple-700 transition-colors" />
							</Link>
						)}
						<Cart />
						<ProfileButton user={user}>
							<Image
								width={40}
								height={40}
								src="https://randomuser.me/api/portraits/lego/7.jpg"
								alt=""
								className="rounded-full"
							/>
						</ProfileButton>
					</>
				) : (
					<Link
						className="font-semibold hover:text-purple-700 transition-colors"
						href="/auth/login"
					>
						Login
					</Link>
				)}
			</div>
		</nav>
	);
}
