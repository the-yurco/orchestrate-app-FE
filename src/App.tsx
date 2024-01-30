// App.tsx
import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import NewFile from './components/NewFile';
import UploadFile from './components/UploadFile';
import FileViewerModal from './components/FileViewerModal';
import NoFilePage from './components/NoFilePage';
import FileList from './components/FileList'; // Import the new component

type FileData = {
	id: number;
	title: string;
	description: string;
};

const App: React.FC = () => {
	const [files, setFiles] = useState<FileData[]>(() => {
		const storedFiles = localStorage.getItem('files');
		return storedFiles ? JSON.parse(storedFiles) : [];
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

	const openFileViewer = (file: FileData) => {
		setSelectedFile(file);
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
			/>

			<FileList files={files} setFiles={setFiles} />

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
