import { fetcher } from "@/helpers/axios";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface GlobalContextProps {
	isAdmin: () => boolean;
	user: any;
	setUser: (user: any) => void;
	refetchKey: number;
	setRefetchKey: Dispatch<SetStateAction<number>>;
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
	const [refetchKey, setRefetchKey] = useState(1);

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
		<GlobalContext.Provider value={{ isAdmin, user, setUser, refetchKey, setRefetchKey }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
