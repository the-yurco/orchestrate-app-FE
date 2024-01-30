import React, { useEffect, useState } from 'react';
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type UploadFileProps = {
	onClose: () => void;
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
};

const UploadFile: React.FC<UploadFileProps> = ({ onClose, setFiles }) => {
	const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
		null
	);
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

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files && e.target.files[0];

		if (selectedFile) {
			const reader = new FileReader();

			reader.onload = (event) => {
				const content = event.target?.result;
				if (content) {
					setFileContent(content);
					setFileName(selectedFile.name);
				}
			};

			if (selectedFile.type.startsWith('image/')) {
				reader.readAsDataURL(selectedFile);
			} else {
				reader.readAsText(selectedFile);
			}
		}
	};

	const handleSaveFile = () => {
		const truncatedFileName = fileName.slice(0, MAX_NAME_LENGTH);

		if (!fileContent || !truncatedFileName.trim()) {
			alert('Please enter both file content and a file name.');
			return;
		}

		const fileTitle = `${truncatedFileName}.${
			fileContent instanceof ArrayBuffer ? 'png' : 'txt'
		}`;

		const newFile: FileData = {
			id: Date.now(),
			title: fileTitle,
			description:
				fileContent instanceof ArrayBuffer
					? 'Image file'
					: (fileContent as string)
		};
		setFiles((prevFiles) => [...prevFiles, newFile]);

		onClose();
	};

	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center ">
			<div className="scale-up-animation bg-zinc-900 p-8 rounded-md border border-zinc-800 w-2/5 text-stone-200">
				<h2 className="text-3xl font-bold mb-4">File: {fileName}</h2>

				<div className="mb-4">
					<h2 className="text-xl">Upload</h2>
					<input
						type="file"
						onChange={handleFileUpload}
						className="border p-2 w-full rounded-md text-zinc-950 bg-stone-200"
					/>
				</div>
				{fileContent instanceof ArrayBuffer && (
					<div className="mb-4">
						<img
							src={`data:image/png;base64,${btoa(
								new Uint8Array(fileContent).reduce(
									(data, byte) => data + String.fromCharCode(byte),
									''
								)
							)}`}
							alt="Uploaded"
							className="w-full rounded-md"
						/>
					</div>
				)}
				<div className="mb-4">
					<h2 className="text-xl">Enter File Name:</h2>
					<input
						type="text"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						maxLength={MAX_NAME_LENGTH}
						className="border p-2 w-full rounded-md text-zinc-950 bg-stone-200"
					/>
				</div>
				<div className="flex gap-3">
					<button
						onClick={handleSaveFile}
						className="px-4 py-1 border border-green-700 bg-green-950  rounded-md text-xs md:text-base hover:bg-green-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquarePlus />
						Add
					</button>
					<button
						onClick={onClose}
						className=" px-4 py-1 border border-zinc-700 bg-zinc-800  rounded-md text-xs md:text-base hover:bg-zinc-700 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2"
					>
						<CiSquareRemove />
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadFile;
