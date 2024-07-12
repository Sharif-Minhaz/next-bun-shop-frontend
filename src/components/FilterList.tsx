import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";

export interface ICategory {
	id: number;
	category_name: string;
}

export default function FilterList({
	loading,
	categories,
}: {
	loading?: boolean;
	categories: ICategory[];
}) {
	const router = useRouter();
	const { query } = router;
	const [selected, setSelected] = useState<number[]>(() => {
		if (query.category) {
			return Array.isArray(query.category)
				? query.category.map((data) => Number(data))
				: query.category.split(",").map((data) => Number(data));
		}
		return [];
	});

	const setCategory = (id: number) => {
		setSelected((prev) => {
			if (prev.includes(id)) {
				const values = prev.filter((data) => data !== id);
				updateQuery(values);
				return values;
			}
			const values = [...prev, id];
			updateQuery(values);
			return values;
		});
	};

	const updateQuery = (values: number[]) => {
		const updatedQuery = {
			...query,
			page: 1,
			categories: values.join(","),
		};
		router.push({
			pathname: router.pathname,
			query: updatedQuery,
		});
	};

	return (
		<div className="flex items-center gap-3 overflow-auto *:rounded-xl">
			{loading && <span className="inline-block px-4 py-2">Loading...</span>}
			<Button
				onClick={() => setSelected([...categories.map((category) => category.id)])}
				variant="outline"
				className={cn(
					"px-4 py-1 font-medium text-sm transition-colors hover:bg-purple-900 hover:text-primary-foreground",
					(selected.length === categories.length || selected.length === 0) &&
						"bg-primary text-white"
				)}
			>
				All
			</Button>
			{categories.map((category) => (
				<Button
					key={category.id}
					onClick={() => setCategory(category.id)}
					variant="outline"
					className={cn(
						"px-4 py-1 font-medium text-sm transition-colors hover:bg-purple-900 hover:text-primary-foreground",
						selected.includes(category.id) ? "bg-primary text-white" : ""
					)}
				>
					{category.category_name}
				</Button>
			))}
		</div>
	);
}
