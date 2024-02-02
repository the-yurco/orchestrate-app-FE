import React, { useEffect, useRef } from 'react';
import { CiFileOn, CiFolderOn } from 'react-icons/ci';
import FileViewerModal from './FileViewerModal';
import FolderViewerModal from './FolderViewerModal';
import ImageViewerModal from './ImageViewerModal'; // Import ImageViewerModal
import Draggable from 'react-draggable';

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
			(folder: FolderData) => folder.id !== selectedFolder?.id
		);
		setFolders(updatedFolders);
		closeFolderViewer();

		const localStorageFolders = JSON.parse(
			localStorage.getItem('folders') || '[]'
		) as FolderData[];
		const updatedLocalStorageFolders = localStorageFolders.filter(
			(folder) => folder.id !== selectedFolder?.id
		);
		localStorage.setItem('folders', JSON.stringify(updatedLocalStorageFolders));
	};

	const allItems = [...files, ...folders].sort((a, b) => b.id - a.id);

	const getFileIcon = (file: FileData) => {
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

	const onMoveToFolder = (folderId: number, file: FileData) => {
		const updatedFiles = files.filter((f) => f.id !== file.id);
		setFiles(updatedFiles);

		const updatedFolders = folders.map((folder) => {
			if (folder.id === folderId) {
				return {
					...folder,
					files: folder.files
						? [...folder.files, { ...file, folderId }]
						: [{ ...file, folderId }]
				};
			}
			return folder;
		});
		setFolders(updatedFolders);
		setSelectedFile(null);
	};

	const renderFileItem = (item: FileData | FolderData) => (
		<li
			key={item.id}
			onClick={() => {
				if ('title' in item) {
					if (
						['jpg', 'png'].includes(
							item.title.split('.').pop()?.toLowerCase() || ''
						)
					) {
						openImageViewer(item);
					} else {
						openFileViewer(item);
					}
				} else {
					openFolderViewer(item);
				}
			}}
			className="bg-transparent flex flex-col items-center gap-3 py-2 sm:py-4 hover:cursor-pointer hover:bg-opacity-40 transition-all duration-300 rounded-md hover:bg-zinc-800"
		>
			{'title' in item ? (
				<img
					src={getFileIcon(item)}
					alt=""
					width={30}
					height={20}
					className="rounded-md"
				/>
			) : (
				<img src="/folder.svg" alt="" width={30} height={20} />
			)}
			<span className="text-xs sm:text-base">
				{'title' in item ? item.title : item.name}
			</span>
		</li>
	);

	const openImageViewer = (file: FileData) => {
		setSelectedFile(file);
	};

	return (
		<section className="flex-grow bg-zinc-950 text-stone-50 py-8 pl-4 md:pl-8 ">
			<div className="flex items-center  gap-3 mb-5">
				<img src="/folder_main.png" alt="" height={70} width={70} />
				<h2 className="title_font font-bold uppercase md:text-3xl lg:text-5xl 2xl:hidden text-stone-200">
					Orchestrate
				</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-12 gap-4 rounded-l-md border-l border-y border-zinc-700 p-3">
				{allItems.map(renderFileItem)}
			</div>

			{selectedFile && (
				<>
					{['jpg', 'png'].includes(
						(selectedFile.title.split('.').pop() || '').toLowerCase()
					) ? (
						<ImageViewerModal
							file={selectedFile}
							onClose={closeFileViewer}
							onSave={updateFile}
							onDelete={deleteFile}
						/>
					) : (
						<FileViewerModal
							file={selectedFile}
							onClose={closeFileViewer}
							onSave={updateFile}
							onDelete={deleteFile}
							onMoveToFolder={onMoveToFolder}
							folders={folders}
						/>
					)}
				</>
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
