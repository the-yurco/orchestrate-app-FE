// React Library IMPORTS
import React from 'react';
// Component IMPORTS
import FileViewerModal from './FileViewerModal';
import FolderViewerModal from './FolderViewerModal';
import ImageViewerModal from './ImageViewerModal';

// TYPES for files and folders
type FileData = {
	id: number;
	title: string;
	description: string;
};

type FolderData = {
	id: number;
	name: string;
	files?: FileData[];
};

// PROPS for the FileList component
type FileListProps = {
	files: FileData[];
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
	folders: FolderData[];
	setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

const FileList = ({ files, setFiles, folders, setFolders }: FileListProps) => {
	// STATE for managing the selected file and the new folder modal visibility
	const [selectedFile, setSelectedFile] = React.useState<FileData | null>(null);
	const [selectedFolder, setSelectedFolder] = React.useState<FolderData | null>(
		null
	);

	// HANDLERS for opening/closing the file/folder viewer modal
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

	// HANDLER for updating a file
	const updateFile = (updatedFile: FileData) => {
		const updatedFiles = files.map((file) =>
			file.id === updatedFile.id ? updatedFile : file
		);
		setFiles(updatedFiles);
	};

	// HANDLER for deleting a file
	const deleteFile = () => {
		const updatedFiles = files.filter((file) => file.id !== selectedFile?.id);
		setFiles(updatedFiles);
		closeFileViewer();
	};

	// HANDLER for updating a folder
	const updateFolder = (updatedFolder: FolderData) => {
		const updatedFolders = folders.map((folder) =>
			folder.id === updatedFolder.id ? updatedFolder : folder
		);
		setFolders(updatedFolders);
	};

	// HANDLER for deleting a folder
	const deleteFolder = () => {
		const updatedFolders = folders.filter(
			(folder: FolderData) => folder.id !== selectedFolder?.id
		);
		setFolders(updatedFolders);
		closeFolderViewer();

		// Update localStorage after deleting a folder
		const localStorageFolders = JSON.parse(
			localStorage.getItem('folders') || '[]'
		) as FolderData[];
		const updatedLocalStorageFolders = localStorageFolders.filter(
			(folder) => folder.id !== selectedFolder?.id
		);
		localStorage.setItem('folders', JSON.stringify(updatedLocalStorageFolders));
	};

	// Combine files and folders to create unified list and sort it by id
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

	// HANDLER for moving a file to a folder
	const onMoveToFolder = (folderId: number, file: FileData) => {
		const updatedFiles = files.filter((f) => f.id !== file.id);
		setFiles(updatedFiles);

		// Update the folder with the new file
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

	// FUNCTION to render a file or folder item
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
				// Displaying file icon
				<img
					src={getFileIcon(item)}
					alt=""
					width={30}
					height={20}
					className="rounded-md"
				/>
			) : (
				// Displaying folder icon
				<img src="/folder.svg" alt="" width={30} height={20} />
			)}
			<span className="text-xs sm:text-base">
				{'title' in item ? item.title : item.name}
			</span>
		</li>
	);

	// HANDLER for opening the image viewer modal
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

			{/* Grid layout for displaying files and folders */}
			<div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-12 gap-4 rounded-l-md border-l border-y border-zinc-700 p-3">
				{allItems.map(renderFileItem)}
			</div>

			{/* Rendering image or file viewer modal based on the selected file */}
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

			{/* Rendering folder viewer modal if a folder is selected */}
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
