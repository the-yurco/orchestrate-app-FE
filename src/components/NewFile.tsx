import React, { useEffect, useState } from 'react';
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type NewFileProps = {
	onClose: () => void;
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
};

const NewFile: React.FC<NewFileProps> = ({ onClose, setFiles }) => {
	const [fileFormat, setFileFormat] = useState('txt');
	const [fileContent, setFileContent] = useState('');
	const [fileName, setFileName] = useState('');
	const MAX_NAME_LENGTH = 10;

	useEffect(() => {
		const storedFiles = localStorage.getItem('files');
		if (storedFiles) {
			setFiles(JSON.parse(storedFiles));
		} else {
			setFiles([]);
		}
	}, [setFiles]);

	const handleFileFormatChange = (format: string) => {
		setFileFormat(format);
	};

	const handleSaveFile = () => {
		const trimmedFileName = fileName.trim();
		const isValidName = /^[a-zA-Z0-9_-]+$/.test(trimmedFileName);

		if (!fileContent.trim() || !trimmedFileName) {
			alert('Please enter both file content and a file name.');
			return;
		}

		if (!isValidName) {
			alert(
				'File name can only include letters, numbers, hyphens, and underscores.'
			);
			return;
		}

		const fileTitle = `${trimmedFileName}.${fileFormat}`;

		const newFile: FileData = {
			id: Date.now(),
			title: fileTitle,
			description: fileContent
		};
		setFiles((prevFiles) => [...prevFiles, newFile]);

		onClose();
	};

	const getFileIcon = () => {
		switch (fileFormat) {
			case 'doc':
				return '/file-type-doc-word-document.svg';
			case 'txt':
				return '/file-type-txt-text-textedit.svg';
			default:
				return '/document.png';
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
						<img
							src={getFileIcon()}
							alt=""
							width={50}
							height={30}
							className="rounded-md"
						/>
						{fileName}.{fileFormat}
					</h2>
					<div className="flex gap-1">
						<button
							onClick={handleSaveFile}
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
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						maxLength={MAX_NAME_LENGTH}
						placeholder="File Name"
						className="border p-2 w-2/3 rounded-md text-stone-200 border-sky-700 bg-sky-950"
					/>
					<select
						value={fileFormat}
						onChange={(e) => handleFileFormatChange(e.target.value)}
						className="border p-2 w-1/3 rounded-md text-stone-200 border-zinc-700 bg-zinc-950"
					>
						<option value="txt"> (txt)</option>
						<option value="md"> (md)</option>
						<option value="doc"> (doc)</option>
					</select>
				</div>
				<div className="mb-2">
					<textarea
						value={fileContent}
						onChange={(e) => setFileContent(e.target.value)}
						className="border p-2 w-full rounded-md text-zinc-950 bg-stone-200 mt-2 min-h-72"
					/>
				</div>
			</div>
		</div>
	);
};

export default NewFile;
