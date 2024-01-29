import React, { useState } from 'react';

import SideBar from './components/SideBar';
import NewFile from './components/NewFile';
import NoFilePage from './components/NoFilePage';
import './index.css';

type FileUploadState = {
	selectedFileId: null | undefined;
	files: never[];
};

type FileData = {
	id: number;
	title: string;
	description: string;
	dueDate: number;
	versionControl: number;
	author: string;
};

const App = () => {
	const [fileUploudState, setFileUploudState] = useState<FileUploadState>({
		selectedFileId: undefined,
		files: []
	});

	const handleFileUploudState = () => {
		setFileUploudState((prevState) => {
			return {
				...prevState,
				selectedFileId: null
			};
		});
	};

	// const handleAddFile = (fileData: FileData) => {
	// 	setFileUploudState((prevState) => {
	// 		const newFile = {
	// 			...fileData,
	// 			id: Math.random()
	// 		};

	// 		return {
	// 			...prevState,
	// 			files: [...prevState.files, newFile]
	// 		};
	// 	});
	// };

	let contentToShow;

	if (fileUploudState.selectedFileId === null) {
		contentToShow = (
			<NewFile
				onAddFile={function (
					event: React.MouseEvent<HTMLButtonElement, MouseEvent>
				): void {
					throw new Error('Function not implemented.');
				}}
			/>
		);
	} else if (fileUploudState.selectedFileId === undefined) {
		contentToShow = <NoFilePage />;
	}

	return (
		<section className=" bg-neutral-800">
			<section className="h-screen py-8 flex gap-10">
				<SideBar onAddFile={handleFileUploudState} />
				{contentToShow}
			</section>
		</section>
	);
};

export default App;
