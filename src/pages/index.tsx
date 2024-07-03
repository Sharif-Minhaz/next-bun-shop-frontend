import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import Product from "@/components/Product";
import FilterList, { ICategory } from "@/components/FilterList";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetcher } from "@/helpers/axios";

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category_id: number;
	image: string;
}

export const getStaticProps = (async (context) => {
	const [resCategory, resProduct] = await Promise.all([
		fetcher("/category"),
		fetcher("/product"),
	]);
	return { props: { categories: resCategory.data?.data, products: resProduct.data?.data } };
}) satisfies GetStaticProps<{
	categories: ICategory[];
	products: IProduct[];
}>;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPageWithLayout<Props> = ({
	categories,
	products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<section className="">
			<Head>
				<title>Next Bun Shop</title>
			</Head>
			<div className="p-5">
				<FilterList categories={categories} />
			</div>
			<div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 pb-5 px-5">
				{products?.map((bun: IProduct) => (
					<Product data={bun} key={bun.id} />
				))}
			</div>
		</section>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
