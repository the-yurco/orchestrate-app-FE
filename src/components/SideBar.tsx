// React Library IMPORTS
import React, { useState } from 'react';
// React-Icons Library IMPORTSs
import { CiFileOn, CiFolderOn, CiInboxOut } from 'react-icons/ci';
// Component IMPORTS
import FileViewerModal from './FileViewerModal';
import NewFolder from './NewFolder';

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

	return (
		<aside className="w-max md:w-1/3 lg:w-80 px-2 md:px-4 py-4 bg-zinc-950 text-stone-50 border-r border-t border-b border-zinc-700 rounded-r-md flex flex-col my-8">
			<div className="h-full flex flex-col gap-3">
				<div className=" flex gap-1 justify-between">
					<div className="flex gap-1">
						{/* Button for adding a new file */}
						<button
							onClick={onAddFile}
							className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300  uppercase flex items-center justify-center gap-2"
						>
							<CiFileOn className=" text-stone-200" />
						</button>

						{/* Button for adding a new folder */}
						<button
							onClick={handleAddFolder}
							className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900  transition-all duration-300  uppercase flex items-center justify-center gap-2"
						>
							<CiFolderOn />
						</button>
					</div>

					{/* Button for uploading a file */}
					<button
						onClick={onUploadFile}
						className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300  uppercase flex items-center justify-center gap-2 "
					>
						<CiInboxOut />
					</button>
				</div>

				{/* List of recently created files */}
				<ul className="border h-full border-zinc-700 rounded-md py-2 flex flex-col ">
					<p className=" text-zinc-500 px-3 border-b border-zinc-700 pb-1">
						Recent Created
					</p>

					{/* Mapping through files to display each file */}
					{files
						.sort((a, b) => b.id - a.id)
						.map((file) => (
							<li
								key={file.id}
								onClick={() => openFileViewer(file)}
								className="bg-transparent border-b border-zinc-800 flex items-center gap-3 py-1 hover:cursor-pointer hover:bg-zinc-900 transition-all duration-300 px-3"
							>
								{/* Displaying folder or file icon based on description */}
								{file.description === 'Folder' ? (
									<CiFolderOn />
								) : (
									<CiFileOn className="" />
								)}{' '}
								{file.title}
							</li>
						))}
				</ul>
			</div>

			{/* Rendering the new folder modal if it is open */}
			{isNewFolderModalOpen && (
				<NewFolder
					onClose={() => setNewFolderModalOpen(false)}
					setFolders={setFolders}
				/>
			)}

			{/* Rendering the file viewer modal if a file is selected */}
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
