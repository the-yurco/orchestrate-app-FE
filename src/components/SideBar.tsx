import React, { useState } from 'react';
import { CiCirclePlus, CiFileOn, CiFolderOn, CiInboxOut } from 'react-icons/ci';
import FileViewerModal from './FileViewerModal';
import NewFolder from './NewFolder';

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

type SideBarProps = {
	onAddFile: () => void;
	onUploadFile: () => void;
	files: FileData[];
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
	folders: FolderData[];
	setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

const SideBar: React.FC<SideBarProps> = ({
	onAddFile,
	files,
	setFiles,
	onUploadFile,
	folders,
	setFolders
}) => {
	const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
	const [isNewFolderModalOpen, setNewFolderModalOpen] = useState(false);

	const openFileViewer = (file: FileData) => {
		setSelectedFile(file);
	};

	const closeFileViewer = () => {
		setSelectedFile(null);
	};

	const updateFile = (updatedFile: FileData) => {
		const updatedFiles = files.map((file) =>
			file.id === updatedFile.id ? updatedFile : file
		);
		setFiles(updatedFiles);
	};

	const deleteFile = () => {
		if (selectedFile) {
			const updatedFiles = files.filter((file) => file.id !== selectedFile.id);
			setFiles(updatedFiles);
			closeFileViewer();
		}
	};

	const handleAddFolder = () => {
		setNewFolderModalOpen(true);
	};

	return (
		<aside className=" w-1/3 px-4 py-8 bg-zinc-950 text-stone-50 md:w-72 border-r border-t border-b border-zinc-700 rounded-r-md flex justify-start flex-col my-8">
			<div className="h-full flex flex-col gap-3">
				<div className=" flex gap-1 justify-between">
					<div className="flex gap-1">
						<button
							onClick={onAddFile}
							className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300  uppercase flex items-center justify-center gap-2"
						>
							<CiFileOn className=" text-stone-200" />
						</button>
						<button
							onClick={handleAddFolder}
							className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900  transition-all duration-300  uppercase flex items-center justify-center gap-2"
						>
							<CiFolderOn />
						</button>
					</div>
					<button
						onClick={onUploadFile}
						className="px-2 py-2 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300  uppercase flex items-center justify-center gap-2 "
					>
						<CiInboxOut />
					</button>
				</div>
				<ul className="border h-full border-zinc-700 rounded-md py-2 flex flex-col ">
					<p className=" text-zinc-500 px-3 border-b border-zinc-700 pb-1">
						Recent Created
					</p>
					{files
						.sort((a, b) => b.id - a.id)
						.map((file) => (
							<li
								key={file.id}
								onClick={() => openFileViewer(file)}
								className="bg-transparent border-b border-zinc-800 flex items-center gap-3 py-1 hover:cursor-pointer hover:bg-zinc-900 transition-all duration-300 px-3"
							>
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
				/>
			)}
		</aside>
	);
};

export default SideBar;
