import { Button } from "@/components/ui/button";

export default function FilterList({ categories }: { categories: string[] }) {
	return (
		<div className="flex items-center gap-4 overflow-auto">
			{categories.map((category) => (
				<Button
					key={category}
					variant="outline"
					className="px-4 py-2 rounded-md font-medium text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
				>
					{category}
				</Button>
			))}
		</div>
	);
}
