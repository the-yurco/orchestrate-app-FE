import React, { useState } from 'react';
import { CiSquareRemove, CiSquarePlus, CiSaveUp2 } from 'react-icons/ci';

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

	const handleSave = () => {
		onSave({ ...file, description: fileContent });
		onClose();
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="bg-neutral-900 p-8 rounded-sm border border-neutral-800 w-2/5 text-stone-200">
				<h2 className="text-3xl font-bold mb-4">File: {file.title}</h2>
				<div className="mb-4">
					{file.title.toLowerCase().endsWith('.png') ? (
						<img
							src={`data:image/png;base64,${file.description}`}
							alt="Uploaded"
							className="w-full rounded-sm"
						/>
					) : (
						<>
							<h2 className="text-xl">File Content:</h2>
							<textarea
								value={fileContent}
								onChange={(e) => setFileContent(e.target.value)}
								className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200 mt-2 min-h-96"
							/>
						</>
					)}
				</div>
				<div className="flex gap-3">
					<button
						onClick={handleSave}
						className="px-4 py-1 border border-emerald-700 bg-emerald-950 rounded-sm text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquarePlus />
						Save
					</button>
					<button
						onClick={onDelete}
						className="px-4 py-1 border border-red-600 bg-red-900 rounded-sm text-xs md:text-base hover:bg-red-800 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquareRemove />
						Delete
					</button>
					<button
						onClick={onClose}
						className="px-4 py-1 border border-neutral-700 bg-neutral-950 rounded-sm text-xs md:text-base hover:bg-neutral-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquareRemove />
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default FileViewerModal;
