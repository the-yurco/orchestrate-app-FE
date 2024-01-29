import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import NewFile from './components/NewFile';
import NoFilePage from './components/NoFilePage';
import './index.css';

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

	const handleAddFile = () => {
		setShowNewFileModal(true);
	};

	const handleCloseModal = () => {
		setShowNewFileModal(false);
	};

	useEffect(() => {
		localStorage.setItem('files', JSON.stringify(files));
	}, [files]);

	return (
		<section className=" bg-neutral-800">
			<section className="h-screen py-8 flex gap-10">
				<SideBar files={files} onAddFile={handleAddFile} />
			</section>

			{showNewFileModal && (
				<NewFile onClose={handleCloseModal} setFiles={setFiles} />
			)}
		</section>
	);
};

export default App;
