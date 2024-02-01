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

type FolderData = {
	id: number;
	name: string;
	backgroundColor: string;
	files?: FileData[];
};

type FileViewerModalProps = {
	file: FileData;
	onClose: () => void;
	onSave: (updatedFile: FileData) => void;
	onDelete: () => void;
	onMoveToFolder: (folderId: number, file: FileData) => void;
	folders: FolderData[];
};

const FileViewerModal: React.FC<FileViewerModalProps> = ({
	file,
	onClose,
	onSave,
	onDelete,
	onMoveToFolder,
	folders
}) => {
	const [fileName, setFileName] = useState(file.title);
	const [fileContent, setFileContent] = useState(file.description);
	const [newFileName, setNewFileName] = useState(file.title.slice(0, 10));
	const [selectedFolder, setSelectedFolder] = useState<number | null | any>(
		null
	);
	const [isFolderDropdownOpen, setFolderDropdownOpen] = useState(false);

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
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200">
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
							<div className="relative">
								<button
									onClick={() => setFolderDropdownOpen(!isFolderDropdownOpen)}
									className="p-1 border border-amber-700 bg-amber-950 rounded-md text-xs md:text-base hover:bg-amber-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
								>
									<CiCircleMore className="text-2xl" />
								</button>
								{isFolderDropdownOpen && (
									<div className="absolute top-full right-0 mt-1 bg-zinc-900 p-2 rounded-md border border-zinc-800 text-stone-200 w-40">
										<label className="block mb-1 text-sm">
											Move to Folder:
										</label>
										<select
											value={selectedFolder}
											onChange={(e) =>
												setSelectedFolder(Number(e.target.value))
											}
											className="w-full p-1 rounded-md bg-zinc-800 border border-zinc-700 text-stone-200"
										>
											<option value="" disabled>
												Select Folder
											</option>
											{folders.map((folder) => (
												<option key={folder.id} value={folder.id}>
													{folder.name}
												</option>
											))}
										</select>
										<button
											onClick={() => {
												if (selectedFolder !== null) {
													onMoveToFolder(selectedFolder, file);
													setFolderDropdownOpen(false);
												}
											}}
											className="w-full p-1 mt-2 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 flex items-center justify-center gap-2"
										>
											Move
										</button>
									</div>
								)}
							</div>
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
