import React, { useState } from 'react';
import {
	CiSquareRemove,
	CiCirclePlus,
	CiTrash,
	CiFloppyDisk,
	CiCircleMore
} from 'react-icons/ci';

type FolderData = {
	id: number;
	name: string;
	backgroundColor: string;
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

	const handleSave = () => {
		onSave({ ...folder, name: folderName });
		onClose();
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-8 rounded-md border border-zinc-800 w-2/5 text-stone-200">
				<div className="flex justify-between items-center ">
					<div className="flex justify-center items-end">
						<h2 className="text-3xl font-bold flex items-center gap-3 ">
							<img src="/folder-icon2.png" alt="" width={50} height={30} />
							{folder.name}
						</h2>
					</div>
					<div className="flex justify-center items-center">
						<button>
							<CiCircleMore className="text-3xl" />
						</button>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="text-xl">Folder Files:</h2>
					<ul></ul>
				</div>
				<div className="flex gap-3">
					<button
						onClick={handleSave}
						className="px-4 py-1 border border-emerald-700 bg-emerald-950 rounded-md text-xs md:text-base hover:bg-emerald-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiFloppyDisk />
						Save
					</button>
					<button
						onClick={onDelete}
						className="px-4 py-1 border border-red-600 bg-red-900 rounded-md text-xs md:text-base hover:bg-red-800 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiTrash />
						Delete
					</button>
					<button
						onClick={onClose}
						className="px-4 py-1 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquareRemove />
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default FolderViewerModal;
