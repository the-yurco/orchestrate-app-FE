// REACT library IMPORTS
import React, { useState } from 'react';
// Recat-Icons IMPORTS
import {
	CiSquareRemove,
	CiTrash,
	CiFloppyDisk,
	CiMenuKebab,
	CiLocationArrow1
} from 'react-icons/ci';

// TYPES for files and folders
type FileData = {
	id: number;
	title: string;
	description: string;
};

type FolderData = {
	id: number;
	name: string;
	// backgroundColor: string;
	files?: FileData[];
};

// TYPES for the FileViewerModal component
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
	// STATE for managing the file content, new file name and its folder selection
	const [fileContent, setFileContent] = useState(file.description);
	const [newFileName, setNewFileName] = useState(file.title.slice(0, 10));
	const [selectedFolder, setSelectedFolder] = useState<number | null | any>(
		// when i get NULL it files will dissappear from the the folder when i refresh
		folders.length > 0 ? folders[0].id : ' '
	);
	const [isFolderDropdownOpen, setFolderDropdownOpen] = useState(false);

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

	// FUNCTION for handling the file save (title and content)
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

	// FUNCTION for moving the file to a different folder
	const handleMoveToFolder = () => {
		if (selectedFolder !== null) {
			onMoveToFolder(selectedFolder, file);
			setFolderDropdownOpen(false);
			onClose();
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200">
				<div className="flex justify-between items-center ">
					<div className="flex justify-center items-end">
						<h2 className="text-3xl font-bold flex items-center gap-3 ">
							<div className="relative">
								{/* Folder dropdown button */}
								<button
									onClick={() => setFolderDropdownOpen(!isFolderDropdownOpen)}
									className="p-1 border border-sky-700 bg-sky-950 rounded-md text-xs md:text-base hover:bg-sky-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
								>
									<CiMenuKebab className="text-xl" />
								</button>

								{/* Folder dropdown content */}
								{isFolderDropdownOpen && (
									<div className="absolute top-full left-0 mt-1 bg-zinc-900 p-2 rounded-md border border-zinc-800 text-stone-200 w-40">
										<label className="block mb-1 text-sm">
											Move to Folder:
										</label>
										<div className="flex items-center h-max gap-1">
											{/* Folder selection */}
											<select
												value={selectedFolder === null ? '' : selectedFolder}
												onChange={(e) =>
													setSelectedFolder(
														e.target.value === ''
															? null
															: Number(e.target.value)
													)
												}
												className="w-full p-1 rounded-md bg-zinc-800 border border-zinc-700 text-stone-200 text-sm"
											>
												<option value="">-----</option>
												{folders.map((folder) => (
													<option key={folder.id} value={folder.id}>
														{folder.name}
													</option>
												))}
											</select>

											{/* Move to Folder button */}
											<button
												onClick={handleMoveToFolder}
												className="w-max p-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 flex items-center justify-center"
											>
												<CiLocationArrow1 className="text-2xl" />
											</button>
										</div>
									</div>
								)}
							</div>

							{/* File icon and title */}
							<img
								src={getFileIcon()}
								alt=""
								width={50}
								height={30}
								className="rounded-md"
							/>
							<span>{file.title}</span>
						</h2>
					</div>

					{/* File action buttons */}
					<div className="flex justify-center items-center gap-5">
						{/* Save and delete buttons */}
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
						</div>

						{/* Close button */}
						<button
							onClick={onClose}
							className="p-1 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiSquareRemove className="text-2xl" />
						</button>
					</div>
				</div>

				{/* File name input */}
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

				{/* File content textarea */}
				<div className="">
					<textarea
						value={fileContent}
						onChange={(e) => setFileContent(e.target.value)}
						className="border p-2 w-full rounded-md text-neutral-950 bg-stone-200 h-80"
					/>
				</div>
			</div>
		</div>
	);
};

export default FileViewerModal;
