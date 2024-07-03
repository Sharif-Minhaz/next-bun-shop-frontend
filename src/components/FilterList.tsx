import { Button } from "@/components/ui/button";

export interface ICategory {
	id: number;
	category_name: string;
}

export default function FilterList({
	loading,
	categories,
}: {
	loading: boolean;
	categories: ICategory[];
}) {
	return (
		<div className="flex items-center gap-4 overflow-auto">
			{loading && <span className="inline-block px-4 py-2">Loading...</span>}
			{categories.map((category) => (
				<Button
					key={category.id}
					variant="outline"
					className="px-4 py-2 rounded-md font-medium text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
				>
					{category.category_name}
				</Button>
			))}
		</div>
	);
}
