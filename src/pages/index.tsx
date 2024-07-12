import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import Product from "@/components/Product";
import FilterList, { ICategory } from "@/components/FilterList";
import { GetServerSideProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { fetcher } from "@/helpers/axios";
import Pagination from "@/components/Pagination";

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category_id: number;
	image: string;
}

export const getServerSideProps = (async (context) => {
	const { query } = context;
	const currentPage = Number(query?.page) || 1;

	// fetch all category info
	const resCategory = await fetcher("/category");

	// provide default category info if not available
	const categories =
		query?.categories ||
		resCategory.data?.data.map((data: { id: number }) => data.id).join(",");

	const resProduct = await fetcher(
		`/product?q=${query?.q || ""}&page=${currentPage}&categories=${categories}`
	);

	return {
		props: {
			categories: resCategory.data?.data,
			products: resProduct.data?.data,
			count: resProduct.data?.count,
		},
	};
}) satisfies GetServerSideProps<{
	categories: ICategory[];
	products: IProduct[];
	count: number;
}>;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPageWithLayout<Props> = ({
	categories,
	products,
	count,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
	const totalPages = Math.ceil(count / 8);

	return (
		<section className="">
			<Head>
				<title>Next Bun Shop</title>
			</Head>
			<div className="p-5">
				<FilterList categories={categories} />
			</div>
			{products.length ? (
				<div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 pb-5 px-5">
					{products.map((bun: IProduct) => (
						<Product data={bun} key={bun.id} />
					))}
				</div>
			) : (
				<div className="text-center py-14 px-2 text-[20px] text-gray-600">
					No product found. Try a different filter.
				</div>
			)}
			<div className="flex justify-center my-5">
				<Pagination totalPages={totalPages} />
			</div>
		</section>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
