import React from 'react';

import './App.css';
import SideBar from './components/SideBar';
// import NewFile from './components/NewFile';
import NoFilePage from './components/NoFilePage';

function App() {
	return (
		<section className=" bg-slate-800">
			<section className="h-screen py-8 flex gap-10">
				<SideBar />
				<NoFilePage />
				{/* <NewFile /> */}
			</section>
		</section>
	);
}

export default App;
