import React, { useState } from 'react';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type FileViewerModalProps = {
	file: FileData;
	onClose: () => void;
	onSave: (updatedFile: FileData) => void;
	onDelete: () => void;
};

const FileViewerModal: React.FC<FileViewerModalProps> = ({
	file,
	onClose,
	onSave,
	onDelete
}) => {
	const [fileContent, setFileContent] = useState(file.description);
	const [newFileName, setNewFileName] = useState(file.title);

	const handleSave = () => {
		const updatedFile: FileData = {
			...file,
			title: newFileName,
			description: fileContent
		};

		onSave(updatedFile);
		onClose();
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center ">
			<div className=" bg-neutral-900 p-8 rounded-sm border border-neutral-800 w-2/5 text-stone-200">
				<h2 className="text-3xl font-bold mb-4">File: {file.title}</h2>
				<div className="mb-4">
					<h2 className="text-xl">File Content:</h2>
					<textarea
						value={fileContent}
						onChange={(e) => setFileContent(e.target.value)}
						className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200"
					/>
				</div>
				<div className="mb-4">
					<h2 className="text-xl">File Name:</h2>
					<input
						type="text"
						value={newFileName}
						onChange={(e) => setNewFileName(e.target.value)}
						className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200"
					/>
				</div>
				<div className="flex gap-3">
					<button
						onClick={handleSave}
						className="px-4 py-1 border border-neutral-700 bg-neutral-800  rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full uppercase "
					>
						Save
					</button>
					<button
						onClick={onDelete}
						className=" px-4 py-1 border border-red-600 bg-red-700  rounded-sm text-xs md:text-base hover:bg-red-800 transition-all duration-300 w-full uppercase "
					>
						Delete
					</button>
					<button
						onClick={onClose}
						className=" px-4 py-1 border border-neutral-700 bg-neutral-800  rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full uppercase "
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default FileViewerModal;
