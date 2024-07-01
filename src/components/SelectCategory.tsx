"use client";

import * as React from "react";
import { ChevronsUpDown, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function SelectCategory({
	value,
	onChange,
	categories,
}: {
	value: string;
	onChange: (...event: any[]) => void;
	categories: string[];
}) {
	const [open, setOpen] = React.useState(false);

	const transformedCategoryData = categories.map((category) => ({
		value: category.toLowerCase(),
		label: category.replace(category.charAt(0), category.charAt(0).toUpperCase()),
	}));

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between"
				>
					{value
						? transformedCategoryData.find((framework) => framework.value === value)
								?.label
						: "Select category..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search category..." className="h-9" />
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{transformedCategoryData.map((framework) => (
								<CommandItem
									key={framework.value}
									value={framework.value}
									onSelect={(e) => {
										onChange(e);
										setOpen(false);
									}}
								>
									{framework.label}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											value === framework.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
