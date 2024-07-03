import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import GlobalProvider from "@/contexts/GlobalContext";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<GlobalProvider>
			<EdgeStoreProvider>
				{getLayout(
					<>
						<Component {...pageProps} />
						<Toaster />
					</>
				)}
			</EdgeStoreProvider>
		</GlobalProvider>
	);
}
