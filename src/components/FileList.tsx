// FileList.tsx
import React from 'react';
import { CiFileOn, CiFolderOn } from 'react-icons/ci';
import FileViewerModal from './FileViewerModal';
import FolderViewerModal from './FolderViewerModal';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type FolderData = {
	id: number;
	name: string;
	backgroundColor: string;
};

type FileListProps = {
	files: FileData[];
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
	folders: FolderData[];
	setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

const FileList: React.FC<FileListProps> = ({
	files,
	setFiles,
	folders,
	setFolders
}) => {
	const [selectedFile, setSelectedFile] = React.useState<FileData | null>(null);
	const [selectedFolder, setSelectedFolder] = React.useState<FolderData | null>(
		null
	);

	const mainColors = ['#FF5733', '#FFC300', '#33FF57', '#33A2FF', '#B633FF'];

	function lighterColor(color: string, factor: number) {
		const hex = color.replace(/^#/, '');
		const bigint = parseInt(hex, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		const newR = Math.min(255, r + r * factor);
		const newG = Math.min(255, g + g * factor);
		const newB = Math.min(255, b + b * factor);

		const newColor = `#${((1 << 24) + (newR << 16) + (newG << 8) + newB)
			.toString(16)
			.slice(1)}`;

		return newColor;
	}

	const openFileViewer = (file: FileData) => {
		setSelectedFile(file);
	};

	const openFolderViewer = (folder: FolderData) => {
		setSelectedFolder(folder);
	};

	const closeFileViewer = () => {
		setSelectedFile(null);
	};

	const closeFolderViewer = () => {
		setSelectedFolder(null);
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

	const updateFolder = (updatedFolder: FolderData) => {
		const updatedFolders = folders.map((folder) =>
			folder.id === updatedFolder.id ? updatedFolder : folder
		);
		setFolders(updatedFolders);
	};

	const deleteFolder = () => {
		const updatedFolders = folders.filter(
			(folder) => folder.id !== selectedFolder?.id
		);
		setFolders(updatedFolders);
		closeFolderViewer();
	};

	const allItems = [...files, ...folders].sort((a, b) => b.id - a.id);

	return (
		<section className="flex-grow bg-zinc-950 text-stone-50 p-8">
			<div className="flex gap-3 items-center justify-start mb-8">
				<img src="/folder_main.png" alt="" height={70} width={75} />
				<h2 className="title_font font-bold uppercase md:text-5xl text-stone-200">
					Orchestrate
				</h2>
			</div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-11 gap-4 rounded-md">
				{allItems.map((item) => (
					<li
						key={item.id}
						onClick={() => {
							if ('title' in item) {
								openFileViewer(item);
							} else {
								openFolderViewer(item);
							}
						}}
						className="bg-transparent border border-zinc-800 flex flex-col items-center gap-3 py-4 hover:cursor-pointer hover:bg-zinc-800 transition-all duration-300 rounded-md"
					>
						{'title' in item ? (
							<CiFileOn className="text-6xl" />
						) : (
							<CiFolderOn className="text-6xl" />
						)}
						<span className="text-base">
							{'title' in item ? item.title : item.name}
						</span>
					</li>
				))}
			</ul>

			{selectedFile && (
				<FileViewerModal
					file={selectedFile}
					onClose={closeFileViewer}
					onSave={updateFile}
					onDelete={deleteFile}
				/>
			)}

			{selectedFolder && (
				<FolderViewerModal
					folder={selectedFolder}
					onClose={closeFolderViewer}
					onSave={updateFolder}
					onDelete={deleteFolder}
				/>
			)}
		</section>
	);
};

export default FileList;
