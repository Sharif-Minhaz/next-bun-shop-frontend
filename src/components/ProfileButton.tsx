import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { ReactElement } from "react";
import { toast } from "./ui/use-toast";

interface IUser {
	name: string;
	email: string;
	role: string;
	id: string;
}

export default function ProfileButton({ user, children }: { user: IUser; children: ReactElement }) {
	const { doLogout, isLoading } = useLogout();

	async function handleLogout() {
		const { error } = await doLogout();

		if (!error) {
			toast({
				title: "Logout successful",
				description: "You can login again, using your credentials.",
			});
		} else {
			toast({
				variant: "destructive",
				title: "Logout failed",
				description: "Something went wrong",
			});
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer" asChild>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>{user.name}</DropdownMenuItem>
					<DropdownMenuItem>{user.email}</DropdownMenuItem>
					<DropdownMenuItem className="capitalize">{user.role}</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					{isLoading ? "Log outing..." : "Log out"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
