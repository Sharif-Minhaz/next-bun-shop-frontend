import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import Product from "@/components/Product";
import products from "@/data/product.json";
import FilterList from "@/components/FilterList";
import { useCategories } from "@/hooks/useCategories";

const Page: NextPageWithLayout = () => {
	const { data, loading } = useCategories();

	return (
		<section className="">
			<Head>
				<title>Next Bun Shop</title>
			</Head>
			<div className="p-5">
				<FilterList categories={data} loading={loading} />
			</div>
			<div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 pb-5 px-5">
				{products.buns?.map((bun) => (
					<Product data={bun} key={bun._id} />
				))}
			</div>
		</section>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
