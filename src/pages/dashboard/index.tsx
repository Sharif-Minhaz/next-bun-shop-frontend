import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ProductForm from "@/components/ProductForm";
import CategoryForm from "@/components/CategoryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderList from "@/components/OrderList";
import Head from "next/head";

const DashboardPage: NextPageWithLayout = () => {
	return (
		<section className="mt-[66px] p-5">
			<Tabs defaultValue="category" className="border shadow-sm">
				<TabsList className="m-3">
					<TabsTrigger value="category">Add Category</TabsTrigger>
					<TabsTrigger value="add-bun">Add Bun</TabsTrigger>
					<TabsTrigger value="order">Order List</TabsTrigger>
				</TabsList>
				<TabsContent value="category">
					<CategoryForm />
				</TabsContent>
				<TabsContent value="add-bun">
					<ProductForm />
				</TabsContent>
				<TabsContent value="order">
					<OrderList />
				</TabsContent>
			</Tabs>
		</section>
	);
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<Head>
				<title>Bun Shop | Dashboard</title>
			</Head>
			<>{page}</>
		</Layout>
	);
};

export default DashboardPage;
