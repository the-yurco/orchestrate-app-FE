import React, { useEffect, useState } from 'react';
import NewFile from './components/NewFile';
import UploadFile from './components/UploadFile';
import FileViewerModal from './components/FileViewerModal';
import NoFilePage from './components/NoFilePage';
import FileList from './components/FileList';
import SideBar from './components/SideBar';

type FileData = {
	id: number;
	title: string;
	description: string;
	files?: FileData[];
};

type FolderData = {
	id: number;
	name: string;
	backgroundColor: string;
};

const App: React.FC = () => {
	const [files, setFiles] = useState<FileData[]>(() => {
		const storedFiles = localStorage.getItem('files');
		return storedFiles ? JSON.parse(storedFiles) : [];
	});

	const [folders, setFolders] = useState<FolderData[]>(() => {
		const storedFolders = localStorage.getItem('folders');
		return storedFolders ? JSON.parse(storedFolders) : [];
	});

	const [showNewFileModal, setShowNewFileModal] = useState(false);
	const [showUploadFileModal, setShowUploadFileModal] = useState(false);
	const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

	const handleAddFile = () => {
		setShowNewFileModal(true);
	};

	const handleUploadFile = () => {
		setShowUploadFileModal(true);
	};

	const handleCloseModal = () => {
		setShowNewFileModal(false);
		setShowUploadFileModal(false);
	};

	const closeFileViewer = () => {
		setSelectedFile(null);
	};

	useEffect(() => {
		localStorage.setItem('files', JSON.stringify(files));
	}, [files]);

	return (
		<section className="bg-zinc-950 flex h-screen">
			<SideBar
				onAddFile={handleAddFile}
				onUploadFile={handleUploadFile}
				files={files}
				setFiles={setFiles}
				folders={folders}
				setFolders={setFolders}
			/>

			<FileList
				files={files}
				setFiles={setFiles}
				folders={folders}
				setFolders={setFolders}
			/>

			{showNewFileModal && (
				<NewFile onClose={handleCloseModal} setFiles={setFiles} />
			)}

			{showUploadFileModal && (
				<UploadFile onClose={handleCloseModal} setFiles={setFiles} />
			)}

			{selectedFile && (
				<FileViewerModal
					file={selectedFile}
					onClose={closeFileViewer}
					onSave={(updatedFile) => {
						setFiles((prevFiles) =>
							prevFiles.map((file) =>
								file.id === updatedFile.id ? updatedFile : file
							)
						);
					}}
					onDelete={() => {
						setFiles((prevFiles) =>
							prevFiles.filter((file) => file.id !== selectedFile.id)
						);
						closeFileViewer();
					}}
				/>
			)}
		</section>
	);
};

export default App;
