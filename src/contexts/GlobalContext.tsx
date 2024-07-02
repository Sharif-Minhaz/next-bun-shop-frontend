import { fetcher } from "@/helpers/axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface GlobalContextProps {
	isAdmin: () => boolean;
	user: any;
	setUser: (user: any) => void;
}

interface UserInfo {
	id: string;
	email: string;
	role: string;
	name: string;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);
export const useGlobalContext = (): GlobalContextProps => {
	const context = useContext(GlobalContext);
	if (context === null) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserInfo>();

	useEffect(() => {
		let ignore = false;
		async function currentUser() {
			const res = await fetcher.get("/auth/current");

			if (!ignore) {
				setUser(res?.data?.data || undefined);
			}
		}

		currentUser();

		return () => {
			ignore = true;
		};
	}, []);

	const isAdmin = () => {
		return user?.role === "admin";
	};

	return (
		<GlobalContext.Provider value={{ isAdmin, user, setUser }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
