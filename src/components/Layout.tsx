import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";
import Head from "next/head";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Head>
				<title>Next Bun Shop</title>
			</Head>
			<Navbar />
			<main className="mt-[60px]">{children}</main>
			<Footer />
		</>
	);
}
