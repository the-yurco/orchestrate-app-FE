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
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center">
			<div className="scale-up-animation bg-zinc-900 p-8 rounded-md border border-zinc-800 w-2/5 text-stone-200">
				<h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
					<img src="/folder-icon2.png" alt="" width={50} height={30} />{' '}
					{folderName}
				</h2>
				<div className="mb-4">
					<h2 className="text-xl">Enter Folder Name:</h2>
					<input
						type="text"
						value={folderName}
						onChange={(e) => setFolderName(e.target.value)}
						className="border p-2 w-full rounded-md text-zinc-950 bg-stone-200"
					/>
				</div>
				<div className="mb-4">
					<h2 className="text-xl">Select Background Color:</h2>
					<select
						value={backgroundColor}
						onChange={(e) => setBackgroundColor(e.target.value)}
						className="border p-2 w-full rounded-md text-zinc-950 bg-stone-200"
					>
						{accessibleColors.map((color) => (
							<option key={color} value={color}>
								{color}
							</option>
						))}
					</select>
				</div>
				<div className="flex gap-3">
					<button
						onClick={handleSaveFolder}
						className="px-4 py-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquarePlus />
						Add
					</button>
					<button
						onClick={onClose}
						className="px-4 py-1 border border-zinc-700 bg-zinc-800 rounded-md text-xs md:text-base hover:bg-zinc-700 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquareRemove />
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewFolder;
