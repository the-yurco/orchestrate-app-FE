// React Library IMPORTS
import React, { useState } from 'react';
// React-Icons Library IMPORTSs
import { CiFileOn, CiFolderOn, CiInboxOut } from 'react-icons/ci';
// Component IMPORTS
import FileViewerModal from './FileViewerModal';
import NewFolder from './NewFolder';

import '../index.css';

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

// PROPS for the SideBar component
type SideBarProps = {
	onAddFile: () => void;
	onUploadFile: () => void;
	files: FileData[];
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
	folders: FolderData[];
	setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

const SideBar = ({
	onAddFile,
	files,
	setFiles,
	onUploadFile,
	folders,
	setFolders
}: SideBarProps) => {
	// STATE for managing the selected file and the new folder modal visibility
	const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
	const [isNewFolderModalOpen, setNewFolderModalOpen] = useState(false);

	// HANDLERS for opening/closing the file viewer modal
	const openFileViewer = (file: FileData) => {
		setSelectedFile(file);
	};
	const closeFileViewer = () => {
		setSelectedFile(null);
	};

	// HANDLER for updating a file
	const updateFile = (updatedFile: FileData) => {
		const updatedFiles = files.map((file) =>
			file.id === updatedFile.id ? updatedFile : file
		);
		setFiles(updatedFiles);
	};

	// HANDLER for deleting a file
	const deleteFile = () => {
		if (selectedFile) {
			const updatedFiles = files.filter((file) => file.id !== selectedFile.id);
			setFiles(updatedFiles);
			closeFileViewer();
		}
	};

	// HANDLER for adding a new folder
	const handleAddFolder = () => {
		setNewFolderModalOpen(true);
	};

	// Function to determine the appropriate icon based on file format
	const getFileIcon = (file: FileData) => {
		const fileExtension = file.title.split('.').pop()?.toLowerCase();

		switch (fileExtension) {
			case 'txt':
				return (
					<img
						src="/file-type-txt-text-textedit.svg"
						alt=""
						width={20}
						height={10}
					/>
				);
			case 'md':
				return <img src="/document.svg" alt="" width={20} height={10} />;
			case 'doc':
			case 'docx':
				return (
					<img
						src="/file-type-doc-word-document.svg"
						alt=""
						width={20}
						height={10}
					/>
				);
			case 'jpg':
				return (
					<img
						src="/file-type-jpg-jpeg-image.svg"
						alt=""
						width={20}
						height={10}
					/>
				);
			case 'png':
				return (
					<img src="/file-type-png-image.svg" alt="" width={20} height={10} />
				);
			default:
				return <img src="/document.svg" alt="" width={20} height={10} />;
		}
	};

	return (
		<aside className="w-max md:w-1/3 lg:w-80 px-2 md:px-4 py-4 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-stone-50 border-r border-t border-b border-zinc-900 rounded-r-lg flex flex-col my-8">
			<div className="h-full flex flex-col gap-3 ">
				<div className="flex gap-1 justify-between ">
					<div className="flex gap-1">
						<button
							onClick={onAddFile}
							className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-lg text-xs md:text-base  cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-[rgba(0,0,0,0.4)_0px_0px_0px_1px,rgba(0,0,0,0.65)_0px_4px_6px_-1px,rgba(255,255,255,0.08)_0px_1px_0px_inset] hover:shadow-[rgba(0,0,0,0.2)_0px_0px_0px_2px,rgba(0,0,0,0.85)_0px_2px_3px_-2px,rgba(255,255,255,0.16)_0px_0px_0px_inset] uppercase flex items-center justify-center gap-2"
						>
							<CiFileOn className="text-stone-200" />
						</button>
						<button
							onClick={handleAddFolder}
							className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-lg text-xs md:text-base  cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-[rgba(0,0,0,0.4)_0px_0px_0px_1px,rgba(0,0,0,0.65)_0px_4px_6px_-1px,rgba(255,255,255,0.08)_0px_1px_0px_inset] hover:shadow-[rgba(0,0,0,0.2)_0px_0px_0px_2px,rgba(0,0,0,0.85)_0px_2px_3px_-2px,rgba(255,255,255,0.16)_0px_0px_0px_inset] uppercase flex items-center justify-center gap-2"
						>
							<CiFolderOn />
						</button>
					</div>
					<button
						onClick={onUploadFile}
						className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-lg text-xs md:text-base  cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-[rgba(0,0,0,0.4)_0px_0px_0px_1px,rgba(0,0,0,0.65)_0px_4px_6px_-1px,rgba(255,255,255,0.08)_0px_1px_0px_inset] hover:shadow-[rgba(0,0,0,0.2)_0px_0px_0px_2px,rgba(0,0,0,0.85)_0px_2px_3px_-2px,rgba(255,255,255,0.16)_0px_0px_0px_inset] uppercase flex items-center justify-center gap-2"
					>
						<CiInboxOut />
					</button>
				</div>
				<ul className="border h-full border-zinc-900 rounded-lg py-2 flex flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 shadow-lg">
					<p className="text-stone-400 px-3 border-b border-zinc-950 pb-5 font-bold">
						Recent Logged Files
					</p>
					{files
						.sort((a, b) => b.id - a.id) // Change sorting to be based on the last move timestamp
						.map((file) => (
							<li
								key={file.id}
								onClick={() => openFileViewer(file)}
								className="bg-transparent border-b border-zinc-900 flex items-center gap-3 py-1 hover:cursor-pointer hover:bg-zinc-900 transition-all duration-300 px-3"
							>
								<div className="flex items-center gap-3">
									{getFileIcon(file)}
									<span className="text-xs sm:text-base font-semibold group-hover:text-opacity-90 transition-all duration-300 text-stone-200">
										{file.title}
									</span>
								</div>
							</li>
						))}
				</ul>
			</div>
			{isNewFolderModalOpen && (
				<NewFolder
					onClose={() => setNewFolderModalOpen(false)}
					setFolders={setFolders}
				/>
			)}
			{selectedFile && (
				<FileViewerModal
					file={selectedFile}
					onClose={closeFileViewer}
					onSave={updateFile}
					onDelete={deleteFile}
					onMoveToFolder={(folderId, file) => {}}
					folders={folders}
				/>
			)}
		</aside>
	);
};

export default SideBar;
