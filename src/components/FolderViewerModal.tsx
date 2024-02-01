import React, { useState, useEffect } from 'react';
import { CiSquareRemove, CiTrash, CiMenuKebab, CiImport } from 'react-icons/ci';

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

type FolderViewerModalProps = {
	folder: FolderData;
	onClose: () => void;
	onSave: (updatedFolder: FolderData) => void;
	onDelete: () => void;
};

const FolderViewerModal: React.FC<FolderViewerModalProps> = ({
	folder,
	onClose,
	onSave,
	onDelete
}) => {
	const [folderName, setFolderName] = useState(folder.name);

	useEffect(() => {
		setFolderName(folder.name);
	}, [folder.name]);

	useEffect(() => {
		const storedFolder = localStorage.getItem(`folder-${folder.id}`);
		if (storedFolder) {
			const parsedFolder = JSON.parse(storedFolder);
			onSave(parsedFolder);
		}
	}, [folder.id, onSave]);

	const getFileIcon = (file: FileData) => {
		const fileExtension = file.title.split('.').pop()?.toLowerCase();

		switch (fileExtension) {
			case 'txt':
				return '/file-type-txt-text-textedit.svg';
			case 'md':
				return '/document.svg';
			case 'doc':
				return '/file-type-doc-word-document.svg';
			default:
				return '/document.svg';
		}
	};

	const handleSave = () => {
		const updatedFolder = { ...folder, name: folderName };
		onSave(updatedFolder);

		const storedFolders = JSON.parse(localStorage.getItem('folders') || '[]');
		const updatedFolders = storedFolders.map((f: FolderData) =>
			f.id === updatedFolder.id ? updatedFolder : f
		);
		localStorage.setItem('folders', JSON.stringify(updatedFolders));

		onClose();
	};

	const handleDownload = (file: FileData) => {
		const blob = new Blob([file.description], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = file.title;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200 min-h-96">
				<div className="flex justify-between items-center mb-10 ">
					<div className="flex gap-3 ">
						<h2 className="text-3xl font-bold flex items-center gap-3 ">
							<button className="p-1 border border-amber-700 bg-amber-950 rounded-md text-xs md:text-base hover:bg-amber-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2">
								<CiMenuKebab className="text-xl" />
							</button>
							<img src="/folder.svg" alt="" width={50} height={30} />
							<span>{folderName}</span>
						</h2>
					</div>
					<div className="flex justify-center items-center gap-3 ">
						<button
							onClick={onDelete}
							className="p-1  border border-red-600 bg-red-900 rounded-md text-xs md:text-base hover:bg-red-800 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiTrash className="text-2xl" />
						</button>
						<button
							onClick={handleSave}
							className="p-1 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiSquareRemove className="text-2xl" />
						</button>
					</div>
				</div>
				<div className="h-80">
					{folder.files ? (
						<ul className="flex flex-col gap-1">
							{folder.files.map((file) => (
								<li
									key={file.id}
									className="text-stone-200 flex items-center border-b w-full border-zinc-800 gap-1 justify-between p-1"
								>
									<div className="flex gap-1">
										<img
											src={getFileIcon(file)}
											alt=""
											width={25}
											height={30}
										/>
										<span className="text-">{file.title}</span>
									</div>
									<div>
										<button
											onClick={() => handleDownload(file)}
											className="p-1 border border-zinc-700 bg-transparent rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
										>
											<CiImport />
										</button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className="flex items-center justify-center h-full">
							<h1 className="text-5xl text-center">I'm Empty...</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FolderViewerModal;
