import React, { MouseEventHandler } from 'react';

type Props = {
	onAddFile: MouseEventHandler<HTMLButtonElement>;
};

const SideBar = ({ onAddFile }: Props) => {
	return (
		<aside className=" w-1/3 px-8 py-16 bg-neutral-950 text-stone-50 md:w-72 border-r border-t border-b border-neutral-700 rounded-sm">
			<div className="flex gap-3 items-center justify-start">
				<img src="/folder_main.png" alt="" height={20} width={25} />
				<h2 className="title_font font-bold uppercase md:text-xl text-stone-200">
					Orchestrate
				</h2>
			</div>
			<div className="mt-8">
				<button
					className="px-4 py-1 border border-neutral-700 bg-neutral-800  rounded-sm text-xs md:text-base hover:bg-neutral-700 transition-all duration-300 w-full"
					onClick={onAddFile}
				>
					+ Add File
				</button>
			</div>
			<ul></ul>
		</aside>
	);
};

export default SideBar;
