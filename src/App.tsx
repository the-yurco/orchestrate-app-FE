import React from 'react';

import SideBar from './components/SideBar';
import NewFile from './components/NewFile';
import NoFilePage from './components/NoFilePage';
import './index.css';

function App() {
	return (
		<section className=" bg-neutral-800">
			<section className="h-screen py-8 flex gap-10">
				<SideBar />
				{/* <NoFilePage /> */}
				<NewFile />
			</section>
		</section>
	);
}

export default App;
