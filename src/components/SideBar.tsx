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
		<aside className=" w-1/3 px-4 py-16 bg-zinc-950 text-stone-50 md:w-72 border-r border-t border-b border-zinc-700 rounded-r-md flex justify-between flex-col my-8">
			<div className="flex gap-3 items-center justify-start">
				<img src="/folder_main.png" alt="" height={20} width={25} />
				<h2 className="title_font font-bold uppercase md:text-xl text-stone-200">
					Orchestrate
				</h2>
			</div>
			<ul className="border h-2/3 border-zinc-700 rounded-md py-2 flex flex-col ">
				<p className=" text-zinc-500 px-3 border-b border-zinc-700 pb-1">
					Recent
				</p>
				{files
					.sort((a, b) => b.id - a.id)
					.map((file) => (
						<li
							key={file.id}
							onClick={() => openFileViewer(file)}
							className="bg-transparent border-b border-zinc-800 flex items-center gap-3 py-1 hover:cursor-pointer hover:bg-zinc-800 transition-all duration-300 px-3"
						>
							<CiFileOn />
							{file.title}
						</li>
					))}
			</ul>
			<div className="mt-8 flex gap-1">
				<button
					onClick={onUploadFile}
					className="px-4 py-1 border border-amber-700 bg-amber-950 rounded-md text-xs md:text-base hover:bg-amber-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
				>
					<CiInboxOut /> Upload
				</button>
				<button
					onClick={onAddFile}
					className="px-4 py-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900  transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
				>
					<CiCirclePlus /> File
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
