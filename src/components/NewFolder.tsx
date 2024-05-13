// React Library IMPORTS
import React, { useEffect, useState } from 'react';
// React-Icons Library IMPORTS
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';

// TYPES for folders
type FolderData = {
	id: number;
	name: string;
};

// TYPES for the NewFolder component
type NewFolderProps = {
	onClose: () => void;
	setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

const NewFolder = ({ onClose, setFolders }: NewFolderProps) => {
	// STATE for managing the folder name
	const [folderName, setFolderName] = useState('');

	// EFFECT for getting the folders from localStorage
	useEffect(() => {
		const storedFolders = localStorage.getItem('folders');
		if (storedFolders) {
			setFolders(JSON.parse(storedFolders));
		} else {
			setFolders([]);
		}
	}, [setFolders]);

	// FUNCTION for adding and saving the folder
	const handleSaveFolder = () => {
		const trimmedFolderName = folderName.trim();
		const isValidName = /^[a-zA-Z0-9_-]+$/.test(trimmedFolderName);

		if (!trimmedFolderName) {
			alert('Please enter a folder name.');
			return;
		}

		if (!isValidName) {
			alert(
				'Folder name can only include letters, numbers, hyphens, and underscores.'
			);
			return;
		}

		const folderTitle = trimmedFolderName;

		const newFolder: FolderData = {
			id: Date.now(),
			name: folderTitle
		};

		setFolders((prevFolders) => {
			localStorage.setItem(
				'folders',
				JSON.stringify([...prevFolders, newFolder])
			);
			return [...prevFolders, newFolder];
		});

		onClose();
	};

	

    return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
						{/* MODAL Header */}
						<img src="/folder.svg" alt="" width={50} height={30} />
						{folderName}
					</h2>

					{/* NewFolder action buttons */}
					<div className="flex gap-1">
						<button
							onClick={handleSaveFolder}
							className="p-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
						>
							<CiSquarePlus className="text-2xl" />
						</button>
						<button
							onClick={onClose}
							className="p-1 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-max h-max uppercase flex items-center justify-center gap-2"
						>
							<CiSquareRemove className="text-2xl" />
						</button>
					</div>
				</div>

				{/* NewFolder name input */}
				<div className="">
					<input
						type="text"
						placeholder="Folder Name"
						value={folderName}
						onChange={(e) => setFolderName(e.target.value)}
						className="border p-2 w-full rounded-md border-amber-700 bg-amber-950"
					/>
				</div>
			</div>
		</div>
	);
};

export default NewFolder;
