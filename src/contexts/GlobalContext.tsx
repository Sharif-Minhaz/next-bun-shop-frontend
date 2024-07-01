import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface GlobalContextProps {
	isAdmin: () => boolean;
	user: any;
	setUser: (user: any) => void;
	loading: boolean;
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
	// const {} = currentUser();
	const [user, setUser] = useState<UserInfo>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {}, []);

	const isAdmin = () => {
		return user?.role === "admin";
	};

	return (
		<GlobalContext.Provider value={{ isAdmin, user, setUser, loading }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
