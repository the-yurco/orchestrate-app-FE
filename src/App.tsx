// React Library IMPORTS
import { useEffect, useState } from 'react';
// Component IMPORTS
import NewFile from './components/NewFile';
import UploadFile from './components/UploadFile';
import FileViewerModal from './components/FileViewerModal';
import FileList from './components/FileList';
import SideBar from './components/SideBar';

// TYPES
type FileData = {
	id: number;
	title: string;
	description: string;
	files?: FileData[];
};

type FolderData = {
	id: number;
	name: string;
	// backgroundColor: string;
	files?: FileData[];
};

const App = () => {
	// STATE hooks for managing the files, folders and modals
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

	// EVENT HANDLERS for opening and closing modals
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

	// EVENT HANDLER for opening and closing file viewer
	const closeFileViewer = () => {
		setSelectedFile(null);
	};

	// EFFECT hook for saving files to localStorage
	useEffect(() => {
		localStorage.setItem('files', JSON.stringify(files));
	}, [files]);

	return (
		<section className="bg-zinc-950 flex h-screen">
			{/* SIDEBAR component displaying and managing files, folders */}
			<SideBar
				onAddFile={handleAddFile}
				onUploadFile={handleUploadFile}
				files={files}
				setFiles={setFiles}
				folders={folders}
				setFolders={setFolders}
			/>

			{/* FILELIST component displaying and managing files, folders */}
			<FileList
				files={files}
				setFiles={setFiles}
				folders={folders}
				setFolders={setFolders}
			/>

			{/* MODALS for creating new file and uploading file */}
			{showNewFileModal && (
				<NewFile onClose={handleCloseModal} setFiles={setFiles} />
			)}
			{showUploadFileModal && (
				<UploadFile onClose={handleCloseModal} setFiles={setFiles} />
			)}

			{/* FILEVIEWERMODAL component for viewing, updating and deleting file */}
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
					onMoveToFolder={(folderId, file) => {}}
					folders={[]}
				/>
			)}
		</section>
	);
};

export default App;
