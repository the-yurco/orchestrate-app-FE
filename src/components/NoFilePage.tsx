import React from 'react';

type Props = {};

const NoFilePage = (props: Props) => {
	return (
		<section className="flex flex-col justify-center items-center w-screen text-stone-200 gap-4">
			<img src="/folde_main.png" alt="" height={300} width={500} />
			<h1 className=" text-3xl font-bold border border-stone-200 px-4 py-2 rounded-xl">
				Orchestrate Folder
			</h1>
			<p className="text-xl">
				Welcome in this random built website where you can add your text file or
				uploud from your pc
			</p>
		</section>
	);
};

export default NoFilePage;
