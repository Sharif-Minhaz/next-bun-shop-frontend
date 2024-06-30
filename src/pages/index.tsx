import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { Button } from "@/components/ui/button";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
	return (
		<div className="bg-red-400">
			<Head>
				<title>Next Bun Shop</title>
			</Head>
			<Button variant="destructive">click</Button>
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
