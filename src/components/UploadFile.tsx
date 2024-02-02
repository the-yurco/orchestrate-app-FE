import React, { useEffect, useState } from 'react';
import { CiSquareRemove, CiSquarePlus, CiLocationArrow1 } from 'react-icons/ci';
import { FaFileImage, FaFileAlt } from 'react-icons/fa';

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

	const allowedFormats = ['md', 'doc', 'docx', 'txt', 'jpg', 'png'];

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

			if (
				selectedFile.type.startsWith('image/') &&
				selectedFile.type.match(/\/(jpg|jpeg|png)$/)
			) {
				reader.readAsDataURL(selectedFile);
			} else if (selectedFile.type.match(/\/(md|doc|docx|txt)$/)) {
				reader.readAsText(selectedFile);
			} else {
				alert(
					'Unsupported file format. Please upload files with formats: md, doc, docx, txt, jpg, png.'
				);
				return;
			}
		}
	};

	const handleSaveFile = () => {
		const truncatedFileName = fileName.slice(0, MAX_NAME_LENGTH);

		if (!fileContent || !truncatedFileName.trim()) {
			alert('Please enter both file content and a file name.');
			return;
		}

		const dotCount = (fileName.match(/\./g) || []).length;

		if (dotCount !== 1) {
			alert(
				'Invalid file name format. Please use only one dot between the filename and format.'
			);
			return;
		}

		const [name, fileExtension] = fileName.split('.');

		if (
			!fileExtension ||
			!allowedFormats.includes(fileExtension.toLowerCase())
		) {
			alert(
				'Unsupported file format. Please upload files with formats: md, doc, docx, txt, jpg, png.'
			);
			return;
		}

		const fileTitle = `${name}.${fileExtension}`;

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
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
			<div className="scale-up-animation bg-zinc-900 p-4 md:p-8 rounded-md border border-zinc-800 w-full md:w-2/3 lg:w-1/2 text-stone-200">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
						{fileContent instanceof ArrayBuffer ? (
							<FaFileImage className="text-4xl" />
						) : (
							<FaFileAlt className="text-4xl" />
						)}
						{fileName}
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
							className="p-1 border border-zinc-700 bg-zinc-950 rounded-md text-xs md:text-base hover:bg-zinc-900 transition-all duration-300 w-full uppercase flex items-center justify-center gap-2 mt-2 sm:mt-0"
						>
							<CiSquareRemove className="text-2xl" />
						</button>
					</div>
				</div>
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
					<h2 className="text-xl">Change File Name:</h2>
					<input
						type="text"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						maxLength={MAX_NAME_LENGTH}
						className="border p-2 w-full rounded-md text-zinc-950 bg-stone-200"
					/>
				</div>
			</div>
		</div>
	);
};

export default UploadFile;
