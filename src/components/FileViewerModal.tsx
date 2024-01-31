import React, { useState } from 'react';
import {
	CiSquareRemove,
	CiTrash,
	CiFloppyDisk,
	CiCircleMore
} from 'react-icons/ci';

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
	const [fileName, setFileName] = useState(file.title);
	const [fileContent, setFileContent] = useState(file.description);
	const [newFileName, setNewFileName] = useState(file.title.slice(0, 10));

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

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-8 rounded-md border border-zinc-800 w-2/5 text-stone-200">
				<div className="flex justify-between items-center ">
					<div className="flex justify-center items-end">
						<h2 className="text-3xl font-bold flex items-center gap-3 ">
							<img src="/file-icon.png" alt="" width={50} height={30} />
							{file.title}
						</h2>
					</div>
					<div className="flex justify-center items-center gap-5">
						<div className="flex gap-1">
							<button
								onClick={handleSave}
								className="p-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
							>
								<CiFloppyDisk className="text-2xl" />
							</button>
							<button
								onClick={onDelete}
								className="p-1 border border-red-600 bg-red-900 rounded-md text-xs md:text-base hover:bg-red-800 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
							>
								<CiTrash className="text-2xl" />
							</button>
							<button className="p-1 border border-amber-700 bg-amber-950 rounded-md text-xs md:text-base hover:bg-amber-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2">
								<CiCircleMore className="text-2xl" />
							</button>
						</div>
						<button
							onClick={onClose}
							className=" border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiSquareRemove className="text-4xl" />
						</button>
					</div>
				</div>

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
						onChange={(e) => setNewFileName(e.target.value.slice(0, 10))}
						maxLength={10}
						className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200"
					/>
				</div>
			</div>
		</div>
	);
};

export default FileViewerModal;
