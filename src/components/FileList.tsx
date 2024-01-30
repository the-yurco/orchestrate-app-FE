// FileList.tsx
import React from 'react';
import { CiFileOn } from 'react-icons/ci';
import FileViewerModal from './FileViewerModal';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type FileListProps = {
	files: FileData[];
	setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
};

const FileList: React.FC<FileListProps> = ({ files, setFiles }) => {
	const [selectedFile, setSelectedFile] = React.useState<FileData | null>(null);

	const openFileViewer = (file: FileData) => {
		setSelectedFile(file);
	};

	const closeFileViewer = () => {
		setSelectedFile(null);
	};

	const updateFile = (updatedFile: FileData) => {
		const updatedFiles = files.map((file) =>
			file.id === updatedFile.id ? updatedFile : file
		);
		setFiles(updatedFiles);
	};

	const deleteFile = () => {
		const updatedFiles = files.filter((file) => file.id !== selectedFile?.id);
		setFiles(updatedFiles);
		closeFileViewer();
	};

	return (
		<section className="flex-grow bg-zinc-950 text-stone-50 p-8">
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
				{files
					.sort((a, b) => b.id - a.id) // Sort files based on id in descending order
					.map((file) => (
						<li
							key={file.id}
							onClick={() => openFileViewer(file)}
							className="bg-transparent border border-zinc-800 flex flex-col items-center gap-3 py-4 hover:cursor-pointer hover:bg-zinc-800 transition-all duration-300 rounded-md"
						>
							<CiFileOn className="text-4xl" />{' '}
							<span className="text-base">{file.title}</span>
						</li>
					))}
			</ul>

			{selectedFile && (
				<FileViewerModal
					file={selectedFile}
					onClose={closeFileViewer}
					onSave={updateFile}
					onDelete={deleteFile}
				/>
			)}
		</section>
	);
};

export default FileList;
