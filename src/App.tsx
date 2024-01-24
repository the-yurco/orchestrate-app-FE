import React, { useState } from 'react';

import SideBar from './components/SideBar';
import NewFile from './components/NewFile';
import NoFilePage from './components/NoFilePage';
import './index.css';
import { MouseEventHandler } from 'react';

type FileUploadState = {
	selectedFileId: null | undefined;
	files: never[];
};

const App = () => {
	const [fileUploudState, setFileUploudState] = useState<FileUploadState>({
		selectedFileId: undefined,
		files: []
	});

	const handleFileUploudState = () => {
		setFileUploudState((prevState) => {
			return {
				...prevState, // spread the previous state to keep 'files' property
				selectedFileId: null
			};
		});
	};

	let contentToShow;

	if (fileUploudState.selectedFileId === null) {
		contentToShow = <NewFile onAddFile={handleFileUploudState} />;
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
