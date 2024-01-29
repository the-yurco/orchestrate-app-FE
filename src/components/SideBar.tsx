import React, { useState } from 'react';
import { CiCirclePlus, CiFileOn, CiInboxOut } from 'react-icons/ci';
import FileViewerModal from './FileViewerModal';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type SideBarProps = {
	onAddFile: () => void;
	onUploadFile: () => void;
	files: FileData[];
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
};

const SideBar: React.FC<SideBarProps> = ({
	onAddFile,
	files,
	setFiles,
	onUploadFile
}) => {
	const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

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
		const updatedFiles = files.filter((file) => file.id !== selectedFile?.id);
		setFiles(updatedFiles);
		closeFileViewer();
	};

	return (
		<aside className=" w-1/3 px-8 py-16 bg-neutral-950 text-stone-50 md:w-72 border-r border-t border-b border-neutral-700 rounded-sm flex justify-between flex-col">
			<div className="flex gap-3 items-center justify-start">
				<img src="/folder_main.png" alt="" height={20} width={25} />
				<h2 className="title_font font-bold uppercase md:text-xl text-stone-200">
					Orchestrate
				</h2>
			</div>
			<ul className="border h-2/3 border-stone-200 rounded-sm p-2 flex flex-col gap-1">
				{files.map((file) => (
					<li
						key={file.id}
						onClick={() => openFileViewer(file)}
						className=" bg-transparent border border-neutral-800 px-5  flex items-center gap-3 py-1 hover:cursor-pointer hover:bg-neutral-800 transition-all duration-300 rounded-sm"
					>
						<CiFileOn />
						{file.title}
					</li>
				))}
			</ul>
			<div className="mt-8 flex gap-1 flex-col">
				<button
					onClick={onUploadFile}
					className="px-4 py-1 border border-neutral-700 bg-neutral-800 rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
				>
					<CiInboxOut /> Upload File
				</button>
				<button
					onClick={onAddFile}
					className="px-4 py-1 border border-neutral-700 bg-neutral-800 rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
				>
					<CiCirclePlus /> Create File
				</button>
			</div>

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
