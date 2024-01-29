import React from 'react';

const NoFilePage = () => {
	return (
		<section className="flex flex-col justify-center items-center w-screen text-stone-200 gap-4">
			<img src="/folder_main.png" alt="" height={300} width={500} />
			<h1 className="title_font text-8xl font-bold px-4 py-2 rounded-xl">
				Orchestrate Pink
			</h1>
			<p className="text-xl">
				Welcome in this random built website where you can add your text file or
				uploud files from your pc !!!
			</p>
		</section>
	);
};

export default NoFilePage;
