import FilterList from "./FilterList";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCategories } from "@/hooks/useCategories";
import { FormEvent, useState } from "react";
import { toast } from "./ui/use-toast";

const CategoryForm = () => {
	const { data, loading, addData, refetch } = useCategories();
	const [categoryName, setCategoryName] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { res, error } = await addData(categoryName);
		if (res?.data?.success) {
			toast({
				title: "Category added successfully",
				description: "View category on the above.",
			});
			setCategoryName("");
			refetch();
		} else if (error) {
			toast({
				variant: "destructive",
				title: error,
				description: "Something went wrong",
			});
		}
	};

	return (
		<div className="p-5">
			<h1 className="mb-3 text-[20px]">Available categories</h1>
			<FilterList loading={loading} categories={data} />
			<h1 className="mt-8 mb-3 text-[20px]">Add a new category</h1>
			<form onSubmit={handleSubmit} className="w-[300px] flex gap-2">
				<Input
					onChange={(e) => setCategoryName(e.target.value)}
					name="category_name"
					required
					value={categoryName}
					placeholder="Category name"
				/>
				<Button type="submit">Add Category</Button>
			</form>
		</div>
	);
};
export default CategoryForm;
