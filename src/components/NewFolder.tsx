import React, { useEffect, useState } from 'react';
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';

type FolderData = {
	id: number;
	name: string;
	backgroundColor: string;
};

type NewFolderProps = {
	onClose: () => void;
	setFolders: React.Dispatch<React.SetStateAction<FolderData[]>>;
};

const NewFolder: React.FC<NewFolderProps> = ({ onClose, setFolders }) => {
	const [folderName, setFolderName] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('#ffffff');
	const MAX_NAME_LENGTH = 12;
	const accessibleColors = [
		'#FF5733',
		'#FFC300',
		'#33FF57',
		'#33A2FF',
		'#B633FF'
	];

	useEffect(() => {
		const storedFolders = localStorage.getItem('folders');
		if (storedFolders) {
			setFolders(JSON.parse(storedFolders));
		} else {
			setFolders([]);
		}
	}, [setFolders]);

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
			name: folderTitle,
			backgroundColor: backgroundColor
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
						<img src="/folder.svg" alt="" width={50} height={30} />
						{folderName}
					</h2>
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
