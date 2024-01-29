import React from 'react';
import { CiFileOn } from 'react-icons/ci';

type FileData = {
	id: number;
	title: string;
	description: string;
};

type SideBarProps = {
	onAddFile: () => void;
	files: FileData[];
};

const SideBar: React.FC<SideBarProps> = ({ onAddFile, files }) => {
	return (
		<aside className=" w-1/3 px-8 py-16 bg-neutral-950 text-stone-50 md:w-72 border-r border-t border-b border-neutral-700 rounded-sm flex justify-between flex-col">
			<div className="flex gap-3 items-center justify-start">
				<img src="/folder_main.png" alt="" height={20} width={25} />
				<h2 className="title_font font-bold uppercase md:text-xl text-stone-200">
					Orchestrate
				</h2>
			</div>
			<ul className="border h-2/3">
				{files.map((file) => (
					<li
						key={file.id}
						className=" bg-neutral-600 px-5 m-1 flex items-center gap-3 py-1"
					>
						<CiFileOn />
						{file.title}
					</li>
				))}
			</ul>
			<div className="mt-8 flex gap-1 flex-col">
				<button
					onClick={onAddFile}
					className="px-4 py-1 border border-neutral-700 bg-neutral-800  rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full uppercase"
				>
					+ Add File
				</button>
				<button className="px-4 py-1 border border-neutral-700 bg-neutral-900  rounded-sm text-xs md:text-base hover:bg-neutral-800 transition-all duration-300 w-full uppercase">
					+ Add Folder
				</button>
			</div>
		</aside>
	);
};

export default SideBar;
