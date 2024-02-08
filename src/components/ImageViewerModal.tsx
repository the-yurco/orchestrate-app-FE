// REACT library IMPORTS
import React, { useState } from 'react';
// Recat-Icons IMPORTS
import { CiSquareRemove, CiTrash, CiFloppyDisk } from 'react-icons/ci';

// TYPES for files
type FileData = {
	id: number;
	title: string;
	description: string;
};

// TYPES for the ImageViewerModal component
type ImageViewerModalProps = {
	file: FileData;
	onClose: () => void;
	onSave: (updatedFile: FileData) => void;
	onDelete: () => void;
};

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
	file,
	onClose,
	onSave,
	onDelete
}) => {
	// STATE for managing the file content and new file name
	const [fileContent, setFileContent] = useState(file.description);
	const [newFileName, setNewFileName] = useState(file.title.slice(0, 10));

	// FUNCTION for saving the file
	const handleSave = () => {
		const existingExtension = file.title.split('.').pop() || '';
		const updatedFile: FileData = {
			...file,
			title: `${newFileName}.${existingExtension}`,
			description: fileContent
		};
		onSave(updatedFile);
		onClose();
	};

	// FUNCTION for getting the file icon
	const getFileIcon = () => {
		const fileExtension = file.title.split('.').pop()?.toLowerCase();

		switch (fileExtension) {
			case 'txt':
				return '/file-type-txt-text-textedit.svg';
			case 'md':
				return '/document.svg';
			case 'doc':
				return '/file-type-doc-word-document.svg';
			case 'docx':
				return '/file-type-doc-word-document.svg';
			case 'jpg':
				return '/file-type-jpg-jpeg-image.svg';
			case 'png':
				return '/file-type-png-image.svg';
			default:
				return '/document.svg';
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold flex items-center gap-3">
						{/* File icon, title, and download button */}
						<img
							src={getFileIcon()}
							alt=""
							width={50}
							height={30}
							className="rounded-md"
						/>
						<span>{file.title}</span>
					</h2>
					<div className="flex gap-1">
						<button
							onClick={handleSave}
							className="p-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiFloppyDisk className="text-2xl" />
						</button>
						<button
							onClick={onDelete}
							className="p-1  border border-red-600 bg-red-900 rounded-md text-xs md:text-base hover:bg-red-800 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiTrash className="text-2xl" />
						</button>
						<button
							onClick={onClose}
							className="p-1 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiSquareRemove className="text-2xl" />
						</button>
					</div>
				</div>

				<div className="my-4">
					<input
						type="text"
						placeholder="New file name"
						value={newFileName}
						onChange={(e) => setNewFileName(e.target.value.slice(0, 10))}
						maxLength={10}
						className="border p-2 w-full rounded-md text-stone-200 border-sky-700 bg-sky-950"
					/>
				</div>
				<div className="flex justify-center items-center">
					<img
						src={fileContent}
						alt="Uploaded"
						className=" max-w-96 rounded-md"
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageViewerModal;
