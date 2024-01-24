import React from 'react';

type Props = {};

const SideBar = (props: Props) => {
	return (
		<aside className=" w-1/3 px-8 py-16 bg-sky-900 text-stone-50 md:w-72 rounded-r-xl">
			<div className="flex gap-3 items-center justify-center">
				<img src="/folder.png" alt="" height={20} width={25} />
				<h2 className=" font-bold uppercase md:text-md text-stone-200">
					Folder Orchestrate
				</h2>
			</div>
			<div className="mt-8">
				<button className="px-4 py-1 border border-sky-700 bg-sky-800 rounded-md text-xs md:text-base hover:bg-sky-700 transition-all duration-300">
					+ Add Project
				</button>
			</div>
			<ul></ul>
		</aside>
	);
};

export default SideBar;
