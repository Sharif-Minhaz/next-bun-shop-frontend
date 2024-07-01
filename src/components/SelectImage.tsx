import Image from "next/image";
import React, { useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
	preview: string;
}

interface Props extends React.ComponentProps<"label"> {
	file?: FileWithPreview | null;
	setFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
}

export const SelectImage = ({ file, setFile, ...props }: Props) => {
	const onDrop = (acceptedFiles: File[]) => {
		const acceptedFile = acceptedFiles[0];
		if (acceptedFile) {
			const fileWithPreview = Object.assign(acceptedFile, {
				preview: URL.createObjectURL(acceptedFile),
			}) as FileWithPreview;

			setFile(fileWithPreview);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "image/*": [".jpeg", ".png", ".jpg"] },
		multiple: false, // Only accept one file
	});

	// Clean up the preview URL when the component is unmounted or the file is changed
	useEffect(() => {
		return () => {
			if (file) {
				URL.revokeObjectURL(file.preview);
			}
		};
	}, [file]);

	return (
		<div className="border rounded-md p-3">
			<label
				// htmlFor="image-upload"
				className="input-items flex items-center justify-between cursor-pointer"
				{...props}
				{...getRootProps()}
			>
				<span
					title={file?.name || "Click to upload"}
					className="w-[230px] overflow-hidden text-ellipsis"
				>
					{file?.name || "Upload an image"}
				</span>
				{file ? (
					<Image
						alt="upload"
						src={file.preview}
						width={50}
						height={50}
						className="rounded-xl"
					/>
				) : (
					<span className="bg-[#cdcccd] rounded-lg px-2 py-1">upload</span>
				)}
			</label>
			<input
				type="file"
				placeholder="image"
				className="hidden"
				accept="image/*"
				{...getInputProps()}
			/>
		</div>
	);
};
