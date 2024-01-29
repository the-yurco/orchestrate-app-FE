import React, { useEffect, useState } from 'react';
import { CiSquareRemove, CiSquarePlus, CiSaveUp2 } from 'react-icons/ci';

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
	const MAX_NAME_LENGTH = 12;

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

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files && e.target.files[0];

		if (selectedFile) {
			const reader = new FileReader();

			reader.onload = (event) => {
				const content = event.target?.result as string;
				setFileContent(content);
				setFileName(selectedFile.name);
			};

			reader.readAsText(selectedFile);
		}
	};

	const handleSaveFile = () => {
		const truncatedFileName = fileName.slice(0, MAX_NAME_LENGTH);

		if (!fileContent.trim() || !truncatedFileName.trim()) {
			alert('Please enter both file content and a file name.');
			return;
		}

		const fileTitle = `${truncatedFileName}.${fileFormat}`;

		const newFile: FileData = {
			id: Date.now(),
			title: fileTitle,
			description: fileContent
		};
		setFiles((prevFiles) => [...prevFiles, newFile]);

		onClose();
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center ">
			<div className=" bg-neutral-900 p-8 rounded-sm border border-neutral-800 w-2/5 text-stone-200">
				<h2 className="text-3xl font-bold mb-4">
					File: {fileName}.{fileFormat}
				</h2>
				<div className="mb-4">
					<h2 className="text-xl">Select File Format:</h2>
					<select
						value={fileFormat}
						onChange={(e) => handleFileFormatChange(e.target.value)}
						className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200"
					>
						<option value="txt">Text (txt)</option>
						<option value="md">Markdown (md)</option>
					</select>
				</div>
				<div className="mb-4">
					<h2 className="text-xl">Enter File Content:</h2>
					<textarea
						value={fileContent}
						onChange={(e) => setFileContent(e.target.value)}
						className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200 mt-2 min-h-96"
					/>
				</div>
				<div className="mb-4">
					<h2 className="text-xl">Enter File Name:</h2>
					<input
						type="text"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						maxLength={MAX_NAME_LENGTH}
						className="border p-2 w-full rounded-sm text-neutral-950 bg-stone-200"
					/>
				</div>
				<div className="flex gap-3">
					<button
						onClick={handleSaveFile}
						className="px-4 py-1 border border-green-700 bg-green-950  rounded-sm text-xs md:text-base hover:bg-green-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquarePlus />
						Add
					</button>
					<button
						onClick={onClose}
						className="px-4 py-1 border border-neutral-700 bg-neutral-800 rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquareRemove />
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewFile;
