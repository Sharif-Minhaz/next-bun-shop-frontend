import FilterList from "./FilterList";
import data from "@/data/product.json";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CategoryForm = () => {
	const allCategories = data.buns.map((bun) => bun.category);
	const categories = new Set([...allCategories]);

	return (
		<div className="p-5">
			<h1 className="mb-3 text-[20px]">Available categories</h1>
			<FilterList categories={Array.from(categories)} />
			<h1 className="mt-4 mb-3 text-[20px]">Add a new category</h1>
			<form className="w-[300px] flex gap-2">
				<Input />
				<Button>Add Category</Button>
			</form>
		</div>
	);
};
export default CategoryForm;
